import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common'; // Adicionei o Request aqui
import { MedicamentosService } from './medicamentos.service';
import { CreateMedicamentoDto } from './dto/create-medicamento.dto';
import { UpdateMedicamentoDto } from './dto/update-medicamento.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('medicamentos')
export class MedicamentosController {
  constructor(private readonly medicamentosService: MedicamentosService) {}

  @Post()
  async create(@Body() createMedicamentoDto: CreateMedicamentoDto, @Request() req) {
    // Corrigido: era createMedicamentoDto, não dot. E passamos o req.user.id
    return await this.medicamentosService.create(createMedicamentoDto, req.user.id);
  }

  @Get()
  async findAll(@Request() req) {
    // Agora o Service recebe o ID do usuário logado
    return await this.medicamentosService.findAll(req.user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.medicamentosService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMedicamentoDto: UpdateMedicamentoDto) {
    return await this.medicamentosService.update(id, updateMedicamentoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.medicamentosService.remove(id);
  }
}