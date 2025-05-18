// src/library-books/library-books.controller.ts

import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LibraryBookService } from './library_book.service';
import { AddBookToLibraryDto } from './dto/create-library_book.dto';
import { BookEntity } from 'src/book/entities/book.entity';
import { UpdateLibraryBooksDto } from './dto/update-library_book.dto';


/**
 * Controlador para la asociación Biblioteca-Libro
 */
// controller: LibraryBooksController
@ApiTags('library-books')
@Controller('libraries/:libraryId/books')
export class LibraryBookController {
  constructor(private readonly libraryBooksService: LibraryBookService) {}

  @ApiOperation({ summary: 'Add a book to a library' })
  @ApiResponse({ status: 201, description: 'Book linked to library.' })
  @Post()
  async addBookToLibrary(
    @Param('libraryId', ParseUUIDPipe) libraryId: string,
    @Body() dto: AddBookToLibraryDto,
  ): Promise<BookEntity> {
    return this.libraryBooksService.addBookToLibrary(
      libraryId,
      dto.bookId,
      dto.copies,
    );
  }

  @ApiOperation({ summary: 'Get all books from a library' })
  @ApiResponse({ status: 200, description: 'List of books in library.' })
  @Get()
  async findBooksFromLibrary(
    @Param('libraryId', ParseUUIDPipe) libraryId: string,
  ): Promise<BookEntity[]> {
    return this.libraryBooksService.findBooksFromLibrary(libraryId);
  }

  @ApiOperation({ summary: 'Get a specific book from a library' })
  @ApiResponse({ status: 200, description: 'Book found in library.' })
  @ApiResponse({ status: 404, description: 'Book not linked to library.' })
  @Get(':bookId')
  async findBookFromLibrary(
    @Param('libraryId', ParseUUIDPipe) libraryId: string,
    @Param('bookId',    ParseUUIDPipe) bookId:    string,
  ): Promise<BookEntity> {
    return this.libraryBooksService.findBookFromLibrary(
      libraryId,
      bookId,
    );
  }

  @ApiOperation({ summary: 'Replace all books in a library' })
  @ApiResponse({ status: 200, description: 'Library books updated.' })
  @Put()
  async updateBooksFromLibrary(
    @Param('libraryId', ParseUUIDPipe) libraryId: string,
    @Body() dto: UpdateLibraryBooksDto,
  ): Promise<BookEntity[]> {
    return this.libraryBooksService.updateBooksFromLibrary(
      libraryId,
      dto.bookIds,
    );
  }

  @ApiOperation({ summary: 'Remove a book from a library' })
  @ApiResponse({ status: 204, description: 'Book unlinked from library.' })
  @ApiResponse({ status: 404, description: 'Book not linked to library.' })
  @Delete(':bookId')
  @HttpCode(204)
  async removeBookFromLibrary(
    @Param('libraryId', ParseUUIDPipe) libraryId: string,
    @Param('bookId',    ParseUUIDPipe) bookId:    string,
  ): Promise<void> {
    return this.libraryBooksService.removeBookFromLibrary(
      libraryId,
      bookId,
    );
  }
}
