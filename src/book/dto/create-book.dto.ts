// src/books/dto/create-book.dto.ts

import { IsString, IsNotEmpty, IsDateString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para crear un Libro
 */
export class CreateBookDto {
  @ApiProperty({
    example: 'Clean Code',
    description: 'Título del libro',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Robert C. Martin',
    description: 'Autor del libro',
  })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({
    example: '2008-08-01T00:00:00.000Z',
    description: 'Fecha de publicación en formato ISO 8601',
  })
  @IsDateString({}, { message: 'publishedDate debe ser una fecha ISO válida' })
  publishedDate: string;

  @ApiProperty({
    example: '9780132350884',
    description: 'ISBN del libro (10–13 caracteres)',
  })
  @IsString()
  @Length(10, 13, { message: 'isbn debe tener entre 10 y 13 caracteres' })
  isbn: string;
}
