import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedicamentosService } from './medicamentos.service';
import { CreateMedicamentoDto } from './dto/create-medicamento.dto';
import { UpdateMedicamentoDto } from './dto/update-medicamento.dto';

@Controller('medicamentos')
export class MedicamentosController {
  constructor(private readonly medicamentosService: MedicamentosService) {}

  @Post()
  create(@Body() createMedicamentoDto: CreateMedicamentoDto) {
    return this.medicamentosService.create(createMedicamentoDto);
  }

  @Get()
  findAll() {
    return this.medicamentosService.findAll();
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
