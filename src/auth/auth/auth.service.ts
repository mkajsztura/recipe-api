import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {
    }

    async register(user: CreateUserDto): Promise<User> {
        return this.userService.create(user);
    }

}
