import { IsString, IsNotEmpty} from 'class-validator'
import { UUID } from 'crypto';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { IsUUID } from 'class-validator';

export class CreateMedicamentoDto {
@IsString()
@IsNotEmpty({ message: 'O nome não pode estar vazio' })
nome: string;

@IsString()
@IsNotEmpty({message:'Diga a dosagem para prosseguir.' })
dosagem: string;

@IsString()
@IsNotEmpty({message: 'O horário tem que ser informado.'})
horario: string;

@IsUUID()
@IsNotEmpty()
usuarioId: string;

}