// src/libraries/dto/update-library.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreateLibraryDto } from './create-library.dto';

/**
 * DTO para actualizar una Biblioteca
 * (todos los campos opcionales)
 */
export class UpdateLibraryDto extends PartialType(CreateLibraryDto) {}
