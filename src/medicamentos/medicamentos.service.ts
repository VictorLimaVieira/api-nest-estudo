import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medicamento } from './entities/medicamento.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { CreateMedicamentoDto } from './dto/create-medicamento.dto';
import { UpdateMedicamentoDto } from './dto/update-medicamento.dto';

@Injectable()
export class MedicamentosService {
  constructor(
    @InjectRepository(Medicamento)
    private medicamentoRepository: Repository<Medicamento>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createMedicamentoDto: CreateMedicamentoDto) {
    const { usuarioId, nome } = createMedicamentoDto;

    // 1. Verifica se o usuário dono do remédio existe no banco
    const usuario = await this.usuarioRepository.findOneBy({ id: usuarioId });
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado para este medicamento.');
    }

    // 2. Verifica se este usuário já cadastrou um remédio com este mesmo nome
    const jaExiste = await this.medicamentoRepository.findOne({
      where: { nome, usuario: { id: usuarioId } },
    });
    if (jaExiste) {
      throw new ConflictException('Você já cadastrou este medicamento!');
    }

    // 3. Cria o objeto do medicamento associando ao objeto do usuário
    const novoMedicamento = this.medicamentoRepository.create({
      ...createMedicamentoDto,
      usuario,
    });

    // 4. Salva permanentemente no banco de dados
    return this.medicamentoRepository.save(novoMedicamento);
  }

  async findAll() {
    return await this.medicamentoRepository.find({
      relations: ['usuario'], // Isso faz aparecer os dados do dono no GET
    });
  }

  async findOne(id: string) {
    const medicamento = await this.medicamentoRepository.findOne({
      where: { id },
      relations: ['usuario'],
    });

    if (!medicamento) {
      throw new NotFoundException(`Medicamento com ID ${id} não encontrado`);
    }
    return medicamento;
  }

  async update(id: string, updateMedicamentoDto: UpdateMedicamentoDto) {
    const medicamento = await this.findOne(id);
    const medicamentoAtualizado = Object.assign(medicamento, updateMedicamentoDto);
    return await this.medicamentoRepository.save(medicamentoAtualizado);
  }

  async remove(id: string) {
    const medicamento = await this.findOne(id);
    return await this.medicamentoRepository.remove(medicamento);
  }
}