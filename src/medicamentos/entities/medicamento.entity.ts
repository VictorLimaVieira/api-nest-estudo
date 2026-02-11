import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
// Importe o Usuario usando o caminho relativo (pontinhos)
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity('medicamentos')
export class Medicamento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  dosagem: string;

  @Column()
  horario: string;

  // Muitos medicamentos para um usuário
  @ManyToOne(() => Usuario, (usuario) => usuario.medicamentos)
  usuario: Usuario;
}