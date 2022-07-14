import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Res() res, @Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return res.status(HttpStatus.OK).json({ data: user, msg: 'User created.' });
  }

  @Get()
  async findAll(@Res() res) {
    const users =  await this.userService.findAll();
    return res.status(HttpStatus.OK).json({ data: users, msg: 'Users list' });

  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
