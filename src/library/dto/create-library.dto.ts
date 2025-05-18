// src/libraries/dto/create-library.dto.ts

import { IsString, IsNotEmpty, Matches } from 'class-validator';

/**
 * DTO para crear una Biblioteca
 */
export class CreateLibraryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @Matches(/^(?:[01]\d|2[0-3]):[0-5]\d$/, {
    message: 'openTime debe tener formato HH:mm',
  })
  openTime: string;

  @IsString()
  @Matches(/^(?:[01]\d|2[0-3]):[0-5]\d$/, {
    message: 'closeTime debe tener formato HH:mm',
  })
  closeTime: string;
}
