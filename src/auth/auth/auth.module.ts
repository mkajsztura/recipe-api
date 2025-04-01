import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [AuthService, UserService],
    controllers: [AuthController],
    exports: [AuthService, UserService],
})
export class AuthModule {}
