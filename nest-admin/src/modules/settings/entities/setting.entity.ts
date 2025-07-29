import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('settings')
export class Setting {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: '设置ID' })
  id: string;

  @Column({ unique: true })
  @ApiProperty({ description: '设置键' })
  key: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ description: '设置值' })
  value: string;

  @Column({ nullable: true })
  @ApiProperty({ description: '设置描述', required: false })
  description: string;

  @Column({ default: true })
  @ApiProperty({ description: '是否启用' })
  isActive: boolean;

  @Column({ type: 'varchar', default: 'string' })
  @ApiProperty({ description: '值类型', enum: ['string', 'number', 'boolean', 'json'] })
  valueType: string;

  @CreateDateColumn()
  @ApiProperty({ description: '创建时间' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: '更新时间' })
  updatedAt: Date;
} 