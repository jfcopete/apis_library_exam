// src/libraries/dto/create-library.dto.ts

import { IsString, IsNotEmpty, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para crear una Biblioteca
 */
export class CreateLibraryDto {
  @ApiProperty({
    example: 'Biblioteca Central',
    description: 'Nombre de la biblioteca',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Calle Falsa 123',
    description: 'Dirección de la biblioteca',
  })
  @IsString()
  @IsNotEmpty()
  adress: string;

  @ApiProperty({
    example: 'Springfield',
    description: 'Ciudad donde está ubicada la biblioteca',
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    example: '08:00-18:00',
    description: 'Horario de atención en formato "HH:mm-HH:mm"',
  })
  @IsString()
  @Matches(/^(?:[01]\d|2[0-3]):[0-5]\d-(?:[01]\d|2[0-3]):[0-5]\d$/, {
    message: 'work_hours debe tener formato HH:mm-HH:mm',
  })
  work_hours: string;
}
