import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Importando o módulo do TypeORM
import { ConfigModule } from '@nestjs/config'; // 🚨 1. Importando o leitor do .env
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { Usuario } from './usuarios/entities/usuario.entity';
import { MedicamentosModule } from './medicamentos/medicamentos.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // 🚨 2. Ligando o cofre logo no início
    ConfigModule.forRoot(),

    // Configuração do Banco de Dados
    TypeOrmModule.forRoot({
      type: 'postgres',
      // 🚨 3. Trocamos as 5 linhas locais por uma única linha que lê a URL da nuvem!
      url: process.env.DATABASE_URL, 
      entities: [],          // Aqui vão entrar as tabelas (Entidades)
      synchronize: true,     // 🚨 Cria as tabelas sozinho Só usar em DEV!
      autoLoadEntities: true,
      ssl: {
        rejectUnauthorized: false, // 🚨 4. Exigência obrigatória da Render para bancos na nuvem!
      },
    }),
    UsuariosModule,
    MedicamentosModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}