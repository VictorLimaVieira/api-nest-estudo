import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity() // Diz pro TypeORM: "Isso é uma tabela no banco!"
export class Usuario {

    @PrimaryGeneratedColumn('uuid') // Gera um ID único mundial
id: string;

@Column()
nome: string;

@Column({unique: true})
email: string;

@Column({ default: true})
ativo: boolean;

@Column() 
senha: string;
}


