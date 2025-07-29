import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { AiTask } from '../../ai-tasks/entities/ai-task.entity';

@Entity('ai_models')
export class AiModel {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: '模型ID' })
  id: string;

  @Column({ unique: true })
  @ApiProperty({ description: '模型名称' })
  name: string;

  @Column({ nullable: true })
  @ApiProperty({ description: '模型描述', required: false })
  description: string;

  @Column({ nullable: true })
  @ApiProperty({ description: '模型版本', required: false })
  version: string;

  @Column({ default: 'offline' })
  @ApiProperty({ description: '模型状态', enum: ['offline', 'online', 'testing'] })
  status: string;

  @Column({ type: 'jsonb', nullable: true })
  @ApiProperty({ description: '模型参数', required: false })
  parameters: Record<string, any>;

  @OneToMany(() => AiTask, task => task.model)
  tasks: AiTask[];

  @CreateDateColumn()
  @ApiProperty({ description: '创建时间' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: '更新时间' })
  updatedAt: Date;
} 