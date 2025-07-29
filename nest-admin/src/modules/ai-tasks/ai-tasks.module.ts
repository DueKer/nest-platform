import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiTask } from './entities/ai-task.entity';
import { AiTasksService } from './ai-tasks.service';
import { AiTasksController } from './ai-tasks.controller';
import { AiModelsModule } from '../ai-models/ai-models.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AiTask]),
    AiModelsModule,
  ],
  controllers: [AiTasksController],
  providers: [AiTasksService],
  exports: [AiTasksService],
})
export class AiTasksModule {} 