import * as bcrypt from 'bcrypt';
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
    const { senha, email } = createUsuarioDto;

    const usuarioExiste = await this.usuarioRepository.findOneBy({ email });
    if (usuarioExiste) {
      throw new ConflictException('Este e-mail já está cadastrado.');
    }
    
    // criptografar a senha:
    const salt = await bcrypt.genSalt(10);
    const senhaCriptografada = await bcrypt.hash(senha, salt);

    // salvar usuario com senha protegida
    const novoUsuario = this.usuarioRepository.create({
      ...createUsuarioDto,
      senha: senhaCriptografada,
    });
    
    return await this.usuarioRepository.save(novoUsuario);
  }

  // --- NOVO MÉTODO PARA O LOGIN ---
 async findByEmail(email: string): Promise<Usuario | null> {
  return await this.usuarioRepository.findOne({ 
    where: { email },
    select: ['id', 'nome', 'email', 'senha'] // O 'senha' aqui é vital!
  });
}
  // --------------------------------

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