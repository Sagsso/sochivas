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
      newUser.auth_data = createUserDto.auth_data;

      newUser.hashPassword();

      await this.userRepository.save(newUser);
      
      delete newUser.password;
      
      const emailCopy = newUser.profile_type != 'Socios' ?
      `<p>
      Estimado ${newUser.full_name}:



Muchas gracias por inscribirse en nuestro Curso Virtual "Cirugía vascular para atención primaria y no especialistas 2022”.<br><br>



Fechas: 16, 23, 30 de agosto y 6 de septiembre de 2022<br><br>



Por favor para concretar su inscripción le solicitamos realizar transferencia a la siguiente cuenta:<br><br>


Sociedad Chilena de Cirugía Vascular y Endovascular<br>

Rut 65.077.655-0<br>

Banco Santander<br>

Cuenta Corriente N° 6813063-8<br>

Asunto: Transferencia Curso Sochivas<br>

Correo: ecco@eccochile.cl <br><br>



Una vez realizado su pago, le rogamos enviar comprobante a ecco@eccochile.cl <br><br>



Una vez habilitada su inscripción le haremos llegar link de ingreso

(este proceso puede demorar hasta 24 horas)

Cualquier duda o comentario por favor comunicarse con ecco@eccochile.cl  y le responderemos a la brevedad.<br><br>



Atentamente,<br>



Sociedad Chilena de Cirugía Vascular y Endovascular
      </p>` :
      `<p>
      
      Asunto: Ya se encuentra confirmado en el Curso SOCHIVAS 2022.<br>



Estimado ${newUser.full_name}:<br>

Su inscripción en nuestro curso "Cirugía vascular para atención primaria y no especialistas 2022”, está confirmada.<br><br>



El curso se realizará en la modalidad virtual los días 16, 23, 30 de agosto y 6 de septiembre de 2022.<br><br>



Únase desde una PC, Mac, iPad, iPhone o dispositivo Android con los siguientes datos:<br><br>

Usuario: *correo del usuario*<br>

Contraseña: SOCHIVAS_2022<br>

Link de acceso: Entrar (Link para entrar a la plataforma - www.sochivascursos.cl)<br><br>



Se sugiere ingresar a la plataforma desde Google Chrome.<br>

Cualquier duda o comentario por favor comunicarse con info@sochivascursos.cl y le responderemos a la brevedad.<br><br>



Atte<br>

Sociedad Chilena de Cirugía Vascular y Endovascular<br><br>



Quedo atenta a cualquier duda y a la confirmación de cuando se puedan hacer pruebas.<br>



Muchas gracias,
      </p>`
      
        // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Sochivas" <info@sochivascursos.cl>', // sender address
      to: newUser.email, // list of receivers
      subject: "Bienvenido al Curso de Sochivas", // Subject line
      text: emailCopy, // plain text body
      html: emailCopy, // html body
    });

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
