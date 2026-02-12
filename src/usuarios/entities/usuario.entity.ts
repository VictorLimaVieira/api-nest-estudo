import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Medicamento } from '../../medicamentos/entities/medicamento.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: true })
  ativo: boolean;

  @Column({select: false})
  senha: string;

  // Um usuário para muitos medicamentos
  @OneToMany(() => Medicamento, (medicamento) => medicamento.usuario)
  medicamentos: Medicamento[];
}