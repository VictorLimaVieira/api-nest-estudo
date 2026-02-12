import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service'; // Ajuste do caminho
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    // 1. Busca o usuário
    const user = await this.usuariosService.findByEmail(email);

    // 2. VERIFICAÇÃO DE SEGURANÇA: Se o usuário não existir, já para aqui
    // Isso evita o erro de "Cannot read properties of undefined"
    if (!user) {
      throw new UnauthorizedException('E-mail ou senha inválidos.');
    }

    // 3. Compara a senha digitada com o Hash do banco
    const isMatch = await bcrypt.compare(pass, user.senha);

    if (!isMatch) {
      throw new UnauthorizedException('E-mail ou senha inválidos.');
    }

    // 4. Gera o Token JWT
    const payload = { sub: user.id, username: user.nome };

    return {
      // Corrigi um errinho de digitação aqui: era access_token (com dois 'c')
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
  