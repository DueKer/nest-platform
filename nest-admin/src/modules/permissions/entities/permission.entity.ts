import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: '权限ID' })
  id: string;

  @Column({ unique: true })
  @ApiProperty({ description: '权限代码' })
  code: string;

  @Column()
  @ApiProperty({ description: '权限名称' })
  name: string;

  @Column({ nullable: true })
  @ApiProperty({ description: '权限描述', required: false })
  description: string;

  @Column({ default: true })
  @ApiProperty({ description: '是否启用' })
  isActive: boolean;

  @CreateDateColumn()
  @ApiProperty({ description: '创建时间' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: '更新时间' })
  updatedAt: Date;
} 