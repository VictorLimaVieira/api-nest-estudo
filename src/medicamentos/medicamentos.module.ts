import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicamentosService } from './medicamentos.service';
import { MedicamentosController } from './medicamentos.controller';
import { Medicamento } from './entities/medicamento.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Module({
  imports: [
    // Registra as duas entidades para serem usadas como repositórios
    TypeOrmModule.forFeature([Medicamento, Usuario])
  ],
  controllers: [MedicamentosController],
  providers: [MedicamentosService],
})
export class MedicamentosModule {}