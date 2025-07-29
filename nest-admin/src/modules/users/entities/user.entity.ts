import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinTable, OneToMany, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { UserLog } from '../../user-logs/entities/user-log.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: '用户ID' })
  id: string;

  @Column({ unique: true })
  @ApiProperty({ description: '用户名' })
  username: string;

  @Column()
  @Exclude()
  @ApiProperty({ description: '密码' })
  password: string;

  @Column({ nullable: true })
  @ApiProperty({ description: '姓名', required: false })
  name: string;

  @Column({ nullable: true })
  @ApiProperty({ description: '邮箱', required: false })
  email: string;

  @Column({ nullable: true })
  @ApiProperty({ description: '手机号', required: false })
  phone: string;

  @Column({ default: true })
  @ApiProperty({ description: '是否激活' })
  isActive: boolean;

  @ManyToOne(() => Role, role => role.users)
  @ApiProperty({ description: '角色' })
  role: Role;

  @OneToMany(() => UserLog, log => log.user)
  logs: UserLog[];

  @CreateDateColumn()
  @ApiProperty({ description: '创建时间' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: '更新时间' })
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
} 