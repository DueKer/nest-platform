import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

@Entity('user_logs')
export class UserLog {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: '日志ID' })
  id: string;

  @ManyToOne(() => User, user => user.logs)
  @ApiProperty({ description: '用户' })
  user: User;

  @Column()
  @ApiProperty({ description: '操作类型' })
  action: string;

  @Column({ nullable: true })
  @ApiProperty({ description: '操作详情', required: false })
  details: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'IP地址', required: false })
  ipAddress: string;

  @Column({ nullable: true })
  @ApiProperty({ description: '用户代理', required: false })
  userAgent: string;

  @CreateDateColumn()
  @ApiProperty({ description: '创建时间' })
  createdAt: Date;
} 