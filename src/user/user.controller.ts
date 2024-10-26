import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDTO } from './dto/SignUpDTO';
import { error } from 'console';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async create(@Body() signUpDTO: SignUpDTO) {
    const user = await this.userService.create(signUpDTO);
    if (!user) {
      return {
        statusCode: 400,
        error: 'Bad Request',
        message: 'Email already exists',
      };
    }
    return {
      statusCode: 201,
      message: 'User created successfully',
      data: user,
    };
  }
}
