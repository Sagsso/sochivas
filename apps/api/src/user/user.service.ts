import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

import {transporter} from './../middlewares/mailer';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    

  }
  async create(createUserDto: CreateUserDto) {
    try {
      
      const newUser = new User();
      newUser.full_name = createUserDto.full_name;
      newUser.email = createUserDto.email;
      newUser.password = createUserDto.password;
      newUser.profile_type = createUserDto.profile_type;
      newUser.contact_type = createUserDto.contact_type;

      newUser.hashPassword();

      await this.userRepository.save(newUser);
      
      delete newUser.password;
      
        // send mail with defined transport object
    // let info = await transporter.sendMail({
    //   from: '"Sochivas 👻" <cursoswebpedago@gmail.com>', // sender address
    //   to: "santiagogalvez17@gmail.com", // list of receivers
    //   subject: "Bienvenido al Curso de Sochivas", // Subject line
    //   text: "Hello world?", // plain text body
    //   html: "<b>Hello world?</b>", // html body
    // });

      return newUser;
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

  }

  async findAll() {
    try {
      const users =  await this.userRepository.find();
      users.map(u => {delete u.password});
      return users;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
