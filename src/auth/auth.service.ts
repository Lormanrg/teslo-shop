import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { CreateUserDto, LoginUserDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt_payload-.interface';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly JwtService: JwtService
  ){

  }
 async create(createUserDto: CreateUserDto) {
try {
  const {password, ...userData} = createUserDto
  const user =  this.userRepository.create({
    ...userData,
    password: bcrypt.hashSync(password, 10 )
  })
  await this.userRepository.save(user)

  delete user.password

  return {
    message: 'Usuario creado correctamente',
    ...user,
    token: this.getJwtToken({email:user.email, id:user.id})
  }
} catch (error) {
  this.handleDBError(error)
}
}

async login(loginUserDto: LoginUserDto){
  const {email, password}= loginUserDto

  const user = await this.userRepository.findOne({
    where: {email},
    select: { id: true, email: true, password: true}

  })

  if(!user)
    throw new UnauthorizedException('Credenciales incorrectas')

  if(!bcrypt.compareSync(password, user.password))
    throw new UnauthorizedException('Credenciales incorrectas')

    return {
      message: 'Login exitoso',
      ...user,
      token: this.getJwtToken({email:user.email, id:user.id})
    }
}

private getJwtToken(payload: JwtPayload){
  const token= this.JwtService.sign(payload)
  return token
}

  private handleDBError(error: any): never{
    if (error.code === "23505")
    throw new BadRequestException(error.detail)
    throw new InternalServerErrorException("Please check server logs")
  }
}
