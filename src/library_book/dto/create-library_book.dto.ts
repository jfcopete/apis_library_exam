// src/library-books/dto/add-book-to-library.dto.ts

import { IsUUID, IsOptional, IsInt, Min } from 'class-validator';

/**
 * DTO para asociar un Libro a una Biblioteca
 */
export class AddBookToLibraryDto {
  @IsUUID('4', { message: 'libraryId debe ser un UUID válido' })
  libraryId: string;

  @IsUUID('4', { message: 'bookId debe ser un UUID válido' })
  bookId: string;

  @IsOptional()
  @IsInt()
  @Min(1, { message: 'copies debe ser al menos 1' })
  copies?: number;
}
