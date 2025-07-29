import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { AiModel } from '../../ai-models/entities/ai-model.entity';
import { User } from '../../users/entities/user.entity';

@Entity('ai_tasks')
export class AiTask {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: '任务ID' })
  id: string;

  @Column()
  @ApiProperty({ description: '任务类型', enum: ['text', 'image', 'audio', 'other'] })
  type: string;

  @Column({ default: 'pending' })
  @ApiProperty({ description: '任务状态', enum: ['pending', 'processing', 'completed', 'failed'] })
  status: string;

  @Column({ type: 'jsonb' })
  @ApiProperty({ description: '输入数据' })
  input: Record<string, any>;

  @Column({ type: 'jsonb', nullable: true })
  @ApiProperty({ description: '输出数据', required: false })
  output: Record<string, any>;

  @Column({ nullable: true })
  @ApiProperty({ description: '错误信息', required: false })
  errorMessage: string;

  @ManyToOne(() => AiModel, model => model.tasks)
  @ApiProperty({ description: '关联模型' })
  model: AiModel;

  @ManyToOne(() => User)
  @ApiProperty({ description: '提交用户' })
  user: User;

  @CreateDateColumn()
  @ApiProperty({ description: '创建时间' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: '完成时间' })
  updatedAt: Date;
} 