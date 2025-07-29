import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('统计与监控')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('dashboard')
  @ApiOperation({ summary: '获取仪表盘统计数据' })
  @ApiResponse({ status: 200, description: '统计数据获取成功' })
  getDashboardStatistics() {
    return this.statisticsService.getDashboardStatistics();
  }

  @Get('tasks')
  @ApiOperation({ summary: '获取任务统计数据' })
  @ApiQuery({ name: 'period', enum: ['day', 'week', 'month', 'year'], required: false })
  @ApiResponse({ status: 200, description: '任务统计数据获取成功' })
  getTaskStatistics(@Query('period') period?: string) {
    return this.statisticsService.getTaskStatistics(period);
  }

  @Get('models')
  @ApiOperation({ summary: '获取模型统计数据' })
  @ApiResponse({ status: 200, description: '模型统计数据获取成功' })
  getModelStatistics() {
    return this.statisticsService.getModelStatistics();
  }

  @Get('users')
  @ApiOperation({ summary: '获取用户统计数据' })
  @ApiResponse({ status: 200, description: '用户统计数据获取成功' })
  getUserStatistics() {
    return this.statisticsService.getUserStatistics();
  }
} 