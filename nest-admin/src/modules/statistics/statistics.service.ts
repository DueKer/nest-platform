import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { AiTask } from '../ai-tasks/entities/ai-task.entity';
import { AiModel } from '../ai-models/entities/ai-model.entity';
import { User } from '../users/entities/user.entity';
import * as moment from 'moment';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(AiTask)
    private readonly taskRepository: Repository<AiTask>,
    @InjectRepository(AiModel)
    private readonly modelRepository: Repository<AiModel>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getTaskStatistics(period: string = 'day') {
    const now = moment();
    let startDate: Date;
    
    switch (period) {
      case 'week':
        startDate = moment().subtract(1, 'week').toDate();
        break;
      case 'month':
        startDate = moment().subtract(1, 'month').toDate();
        break;
      case 'year':
        startDate = moment().subtract(1, 'year').toDate();
        break;
      case 'day':
      default:
        startDate = moment().subtract(1, 'day').toDate();
    }

    const tasks = await this.taskRepository.find({
      where: {
        createdAt: Between(startDate, now.toDate()),
      },
      relations: ['model', 'user'],
    });

    // 按模型分组
    const tasksByModel = {};
    tasks.forEach(task => {
      const modelName = task.model ? task.model.name : 'unknown';
      if (!tasksByModel[modelName]) {
        tasksByModel[modelName] = {
          total: 0,
          completed: 0,
          failed: 0,
        };
      }
      
      tasksByModel[modelName].total += 1;
      if (task.status === 'completed') {
        tasksByModel[modelName].completed += 1;
      } else if (task.status === 'failed') {
        tasksByModel[modelName].failed += 1;
      }
    });

    // 按状态分组
    const tasksByStatus = {
      pending: 0,
      processing: 0,
      completed: 0,
      failed: 0,
    };

    tasks.forEach(task => {
      tasksByStatus[task.status] += 1;
    });

    // 按类型分组
    const tasksByType = {};
    tasks.forEach(task => {
      if (!tasksByType[task.type]) {
        tasksByType[task.type] = 0;
      }
      tasksByType[task.type] += 1;
    });

    return {
      totalTasks: tasks.length,
      tasksByModel,
      tasksByStatus,
      tasksByType,
      period,
    };
  }

  async getModelStatistics() {
    const models = await this.modelRepository.find();
    
    const modelStats = {
      total: models.length,
      online: models.filter(model => model.status === 'online').length,
      offline: models.filter(model => model.status === 'offline').length,
      testing: models.filter(model => model.status === 'testing').length,
    };

    return modelStats;
  }

  async getUserStatistics() {
    const users = await this.userRepository.find({
      relations: ['role'],
    });

    const userStats = {
      total: users.length,
      active: users.filter(user => user.isActive).length,
      inactive: users.filter(user => !user.isActive).length,
      byRole: {},
    };

    // 按角色分组
    users.forEach(user => {
      const roleName = user.role ? user.role.name : 'unknown';
      if (!userStats.byRole[roleName]) {
        userStats.byRole[roleName] = 0;
      }
      userStats.byRole[roleName] += 1;
    });

    return userStats;
  }

  async getDashboardStatistics() {
    const taskStats = await this.getTaskStatistics('week');
    const modelStats = await this.getModelStatistics();
    const userStats = await this.getUserStatistics();

    return {
      taskStats,
      modelStats,
      userStats,
    };
  }
} 