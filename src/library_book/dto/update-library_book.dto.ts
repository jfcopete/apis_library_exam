// src/library-books/dto/update-library-books.dto.ts

import { IsUUID, ArrayNotEmpty } from 'class-validator';

/**
 * DTO para reemplazar la lista de Libros de una Biblioteca
 */
export class UpdateLibraryBooksDto {
  @ArrayNotEmpty({ message: 'bookIds no puede estar vacío' })
  @IsUUID('4', { each: true, message: 'Cada bookId debe ser un UUID válido' })
  bookIds: string[];
}
