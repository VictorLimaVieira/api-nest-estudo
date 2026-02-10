import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const emailExiste = await this.usuarioRepository.findOne({
      where: { email: createUsuarioDto.email },
    });

    if (emailExiste) {
      throw new ConflictException('Este e-mail já está cadastrado no sistema');
    }

    const usuario = this.usuarioRepository.create(createUsuarioDto);
    const usuarioSalvo = await this.usuarioRepository.save(usuario);

    // Usamos o 'any' aqui para o TypeScript não reclamar do delete
    const retorno = usuarioSalvo as any;
    delete retorno.senha;
    
    return retorno;
  }

  async findAll() {
    const usuarios = await this.usuarioRepository.find();
    return usuarios.map((usuario) => {
      const u = usuario as any;
      delete u.senha;
      return u;
    });
  }

  async findOne(id: string) {
    const usuario = await this.usuarioRepository.findOneBy({ id });
    if (usuario) {
      const u = usuario as any;
      delete u.senha;
      return u;
    }
    return null;
  }

  update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioRepository.update(id, updateUsuarioDto);
  }

  remove(id: string) {
    return this.usuarioRepository.delete(id);
  }
}