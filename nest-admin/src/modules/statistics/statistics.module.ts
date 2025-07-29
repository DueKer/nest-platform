import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { AiTask } from '../ai-tasks/entities/ai-task.entity';
import { User } from '../users/entities/user.entity';
import { AiModel } from '../ai-models/entities/ai-model.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AiTask, User, AiModel])],
  controllers: [StatisticsController],
  providers: [StatisticsService],
  exports: [StatisticsService],
})
export class StatisticsModule {} 