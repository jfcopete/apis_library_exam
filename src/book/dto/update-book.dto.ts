// src/books/dto/update-book.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';

/**
 * DTO para actualizar un Libro
 * (todos los campos opcionales)
 */
export class UpdateBookDto extends PartialType(CreateBookDto) {}
