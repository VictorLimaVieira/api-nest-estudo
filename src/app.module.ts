import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Importando o módulo do TypeORM
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { Usuario } from './usuarios/entities/usuario.entity';

@Module({
  imports: [
    // Configuração do Banco de Dados
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',    
      database: 'nest_db',  // Nome do banco
      entities: [],         // Aqui vão entrar as tabelas (Entidades)
      synchronize: true,    // 🚨 Cria as tabelas sozinho Só usar em DEV!
      autoLoadEntities: true,
    }),
    UsuariosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}