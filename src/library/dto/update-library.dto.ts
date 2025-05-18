// src/libraries/dto/update-library.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreateLibraryDto } from './create-library.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * DTO para actualizar una Biblioteca
 * (todos los campos opcionales)
 */
export class UpdateLibraryDto extends PartialType(CreateLibraryDto) {
  @ApiPropertyOptional({
    example: 'Biblioteca Secundaria',
    description: 'Nombre actualizado de la biblioteca',
  })
  name?: string;

  @ApiPropertyOptional({
    example: 'Av. Siempre Viva 456',
    description: 'Dirección actualizada',
  })
  adress?: string;

  @ApiPropertyOptional({
    example: 'Shelbyville',
    description: 'Ciudad actualizada',
  })
  city?: string;

  @ApiPropertyOptional({
    example: '09:00-20:00',
    description: 'Horario actualizado en formato "HH:mm-HH:mm"',
  })
  work_hours?: string;
}
