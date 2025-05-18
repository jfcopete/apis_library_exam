// src/library-books/dto/update-library-books.dto.ts

import { IsUUID, ArrayNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para reemplazar la lista de Libros de una Biblioteca
 */
export class UpdateLibraryBooksDto {
  @ApiProperty({
    example: [
      'b2c3d4e5-f6a7-48b9-8c7d-6e5f4a3b2c1d',
      'c3d4e5f6-a7b8-49c0-9d1e-7f6g5h4i3j2k',
    ],
    description: 'Array de IDs de libros en formato UUID v4',
  })
  @ArrayNotEmpty({ message: 'bookIds no puede estar vacío' })
  @IsUUID('4', { each: true, message: 'Cada bookId debe ser un UUID válido' })
  bookIds: string[];
}
