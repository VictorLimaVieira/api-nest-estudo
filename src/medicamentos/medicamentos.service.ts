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

  async create(createMedicamentoDto: CreateMedicamentoDto, usuarioId: string) {
    const { nome } = createMedicamentoDto;
    const usuario = await this.usuarioRepository.findOneBy({ id: usuarioId });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const jaExiste = await this.medicamentoRepository.findOne({
      where: { nome, usuario: { id: usuarioId } },
    });
    
    if (jaExiste) {
      throw new ConflictException('Você já cadastrou este medicamento!');
    }

    const novoMedicamento = this.medicamentoRepository.create({
      nome: createMedicamentoDto.nome,
      dosagem: createMedicamentoDto.dosagem,
      horario: createMedicamentoDto.horario,
      usuario: usuario,
    });

    return await this.medicamentoRepository.save(novoMedicamento);
  }

  async findAll(usuarioId: string) {
    return await this.medicamentoRepository.find({
      where: { usuario: { id: usuarioId } },
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