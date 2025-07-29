import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('认证')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: '登录' })
  @ApiResponse({ 
    status: 200, 
    description: '登录成功',
    schema: {
      properties: {
        accessToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid', example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11' },
            username: { type: 'string', example: 'admin' },
            name: { type: 'string', example: '系统管理员' },
            email: { type: 'string', example: 'admin@example.com' },
            role: {
              type: 'object',
              properties: {
                id: { type: 'string', format: 'uuid', example: 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22' },
                name: { type: 'string', example: '管理员' }
              }
            }
          }
        }
      }
    }
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
} 