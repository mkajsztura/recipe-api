import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/user.entity';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {
    }

    @Post('register')
    register(@Body() user: CreateUserDto): Promise<User> {
        //     TODO confirm password
        return this.authService.register(user);
    }
}
