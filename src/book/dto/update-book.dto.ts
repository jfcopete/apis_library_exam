// src/books/dto/update-book.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * DTO para actualizar un Libro
 * (todos los campos opcionales)
 */
export class UpdateBookDto extends PartialType(CreateBookDto) {
  @ApiPropertyOptional({
    example: 'Refactoring',
    description: 'Nuevo título del libro (opcional)',
  })
  title?: string;

  @ApiPropertyOptional({
    example: 'Martin Fowler',
    description: 'Nuevo autor del libro (opcional)',
  })
  author?: string;

  @ApiPropertyOptional({
    example: '2018-11-19T00:00:00.000Z',
    description: 'Nueva fecha de publicación en formato ISO 8601 (opcional)',
  })
  publishedDate?: string;

  @ApiPropertyOptional({
    example: '9780201485677',
    description: 'Nuevo ISBN del libro (10–13 caracteres, opcional)',
  })
  isbn?: string;
}
