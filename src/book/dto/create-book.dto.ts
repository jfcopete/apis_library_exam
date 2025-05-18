// src/books/dto/create-book.dto.ts

import { IsString, IsNotEmpty, IsDateString, Length } from 'class-validator';

/**
 * DTO para crear un Libro
 */
export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsDateString({}, { message: 'publishedDate debe ser una fecha ISO válida' })
  publishedDate: string;

  @IsString()
  @Length(10, 13, { message: 'isbn debe tener entre 10 y 13 caracteres' })
  isbn: string;
}
