// src/library-books/dto/add-book-to-library.dto.ts

import { IsUUID, IsOptional, IsInt, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * DTO para asociar un Libro a una Biblioteca
 */
export class AddBookToLibraryDto {
  @ApiProperty({
    example: 'a3f1e6d2-5b4c-4e8f-9d2b-1a2b3c4d5e6f',
    description: 'ID de la biblioteca en formato UUID v4',
  })
  @IsUUID('4', { message: 'libraryId debe ser un UUID válido' })
  libraryId: string;

  @ApiProperty({
    example: 'b2c3d4e5-f6a7-48b9-8c7d-6e5f4a3b2c1d',
    description: 'ID del libro en formato UUID v4',
  })
  @IsUUID('4', { message: 'bookId debe ser un UUID válido' })
  bookId: string;

  @ApiPropertyOptional({
    example: 3,
    description: 'Número de copias a vincular (opcional, mínimo 1)',
  })
  @IsOptional()
  @IsInt()
  @Min(1, { message: 'copies debe ser al menos 1' })
  copies?: number;
}
