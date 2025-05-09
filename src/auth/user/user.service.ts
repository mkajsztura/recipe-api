import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {
    }

    async create(user: Pick<CreateUserDto, 'email' | 'password'>): Promise<User> {
        return this.userRepository.save({
            password: this.hashPassword(user.password),
            email: user.email.trim().toLowerCase(),
        });
    }

    private hashPassword(password: string): string {
        return bcrypt.hashSync(password, 10);
    }
}
