import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'victor@teste2.com' })
  @IsEmail({}, { message: 'Envie um e-mail válido' })
  email: string;

  @ApiProperty({ example: 'ads123' })
  @IsString()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  senha: string;
}