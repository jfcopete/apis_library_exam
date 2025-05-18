// src/books/books.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookService } from './book.service';
import { BookEntity } from './entities/book.entity';

/**
 * Controlador para los endpoints de Libro
 */
// controller: BooksController
@ApiTags('books')
@Controller('books')
export class BookController {
  constructor(private readonly booksService: BookService) {}

  @ApiOperation({ summary: 'Create a new book' })
  @ApiResponse({ status: 201, description: 'Book created successfully.' })
  @Post()
  async create(@Body() createDto: CreateBookDto): Promise<BookEntity> {
    return this.booksService.create(createDto);
  }

  @ApiOperation({ summary: 'Get all books' })
  @ApiResponse({ status: 200, description: 'List of books.' })
  @Get()
  async findAll(): Promise<BookEntity[]> {
    return this.booksService.findAll();
  }

  @ApiOperation({ summary: 'Get book by ID' })
  @ApiResponse({ status: 200, description: 'Book detail.' })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<BookEntity> {
    return this.booksService.findOne(id);
  }

  @ApiOperation({ summary: 'Update book by ID' })
  @ApiResponse({ status: 200, description: 'Book updated successfully.' })
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateBookDto,
  ): Promise<BookEntity> {
    return this.booksService.update(id, updateDto);
  }

  @ApiOperation({ summary: 'Delete book by ID' })
  @ApiResponse({ status: 204, description: 'Book deleted successfully.' })
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.booksService.remove(id);
  }
}
