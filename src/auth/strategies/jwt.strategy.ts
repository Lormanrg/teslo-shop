import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../entities/user.entity";
import { JwtPayload } from "../dto/jwt_payload.dto";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UnauthorizedException } from "@nestjs/common";

export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(User)
        private readonly userRepositoy:Repository<User>,
        
        configService:ConfigService,

    ){
        super(
            {
                secretOrKey: configService.get('JWT_SECRET'),
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()

            }
        )
    }
   async validate(payload:JwtPayload): Promise<User> {

    const {email} = payload

    const user = await this.userRepositoy.findOneBy({email})

    if(!user)
    throw new UnauthorizedException('Token not valid')

    if(!user.isActive)
    throw new UnauthorizedException('User is not active')

    

    return user
    }
    
}