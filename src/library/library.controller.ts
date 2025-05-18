// src/libraries/libraries.controller.ts

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateLibraryDto } from './dto/create-library.dto';
import { UpdateLibraryDto } from './dto/update-library.dto';
import { LibraryService } from './library.service';
import { LibraryEntity } from './entities/library.entity';
/**
 * Controlador para la entidad Biblioteca
 */
// controller: LibrariesController
@ApiTags('libraries')
@Controller('libraries')
export class LibraryController {
  constructor(private readonly librariesService: LibraryService) {}

  @ApiOperation({ summary: 'Create a new library' })
  @ApiResponse({ status: 201, description: 'Library created.' })
  @Post()
  async create(
    @Body() createDto: CreateLibraryDto,
  ): Promise<LibraryEntity> {
    return this.librariesService.create(createDto);
  }

  @ApiOperation({ summary: 'Get all libraries' })
  @ApiResponse({ status: 200, description: 'List of libraries.' })
  @Get()
  async findAll(): Promise<LibraryEntity[]> {
    return this.librariesService.findAll();
  }

  @ApiOperation({ summary: 'Get a library by ID' })
  @ApiResponse({ status: 200, description: 'Library found.' })
  @ApiResponse({ status: 404, description: 'Library not found.' })
  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<LibraryEntity> {
    return this.librariesService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a library by ID' })
  @ApiResponse({ status: 200, description: 'Library updated.' })
  @ApiResponse({ status: 404, description: 'Library not found.' })
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateLibraryDto,
  ): Promise<LibraryEntity> {
    return this.librariesService.update(id, updateDto);
  }

  @ApiOperation({ summary: 'Delete a library by ID' })
  @ApiResponse({ status: 204, description: 'Library deleted.' })
  @ApiResponse({ status: 404, description: 'Library not found.' })
  @Delete(':id')
  @HttpCode(204)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    return this.librariesService.remove(id);
  }
}
