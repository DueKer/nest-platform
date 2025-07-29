import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Permission } from '../../permissions/entities/permission.entity';
import { ManyToMany } from 'typeorm';
import { JoinTable } from 'typeorm';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: '角色ID' })
  id: string;

  @Column({ unique: true })
  @ApiProperty({ description: '角色名称' })
  name: string;

  @Column({ nullable: true })
  @ApiProperty({ description: '角色描述', required: false })
  description: string;

  @OneToMany(() => User, user => user.role)
  users: User[];

  @ManyToMany(() => Permission, { cascade: true })
  @JoinTable({
    name: 'role_permissions',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
  })
  @ApiProperty({ description: '权限列表', type: [Permission] })
  permissions: Permission[];

  @CreateDateColumn()
  @ApiProperty({ description: '创建时间' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: '更新时间' })
  updatedAt: Date;
} 