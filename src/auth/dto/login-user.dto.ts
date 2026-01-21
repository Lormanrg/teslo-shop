import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, Matches } from "class-validator";


export class LoginUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;


    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength (50)
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/,
        {
            message: 'La contraseña debe tener 1 mayuscula, 1 minuscula, 1 numero y 1 caracter especial',
        }
    )
    password: string;
}