import { OmitType } from '@nestjs/mapped-types';
import { UpdateUserDto } from './update-user.dto';
import { Match } from '../../../decorators/match.decorator';
import { IsString } from 'class-validator';

export class CreateUserDto extends OmitType(UpdateUserDto, ['id']) {
    @IsString()
    @Match<CreateUserDto>('password')
    confirmPassword: string;
}
