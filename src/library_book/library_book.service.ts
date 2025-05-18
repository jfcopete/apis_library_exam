// src/library-books/library-books.service.ts

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LibraryBookEntity } from './entities/librarybook.entity';
import { LibraryEntity } from 'src/library/entities/library.entity';
import { BookEntity } from 'src/book/entities/book.entity';


/**
 * Lógica de negocio para la asociación Biblioteca ↔ Libro
 */
// service: LibraryBooksService
@Injectable()
export class LibraryBookService {
  constructor(
    @InjectRepository(LibraryBookEntity)
    private readonly libraryBookRepo: Repository<LibraryBookEntity>,
    @InjectRepository(LibraryEntity)
    private readonly libraryRepo: Repository<LibraryEntity>,
    @InjectRepository(BookEntity)
    private readonly bookRepo: Repository<BookEntity>,
  ) {}

  /**
   * Asocia un libro a una biblioteca o lanza 404 si no existen
   */
  async addBookToLibrary(
    libraryId: string,
    bookId: string,
    copies = 1,
  ): Promise<BookEntity> {
    const library = await this.libraryRepo.findOne({ where: { id: libraryId } });
    if (!library) {
      throw new NotFoundException(`Library ${libraryId} not found`);
    }

    const book = await this.bookRepo.findOne({ where: { id: bookId } });
    if (!book) {
      throw new NotFoundException(`Book ${bookId} not found`);
    }

    // Prevenir duplicados
    const existing = await this.libraryBookRepo.findOne({
      where: { library: { id: libraryId }, book: { id: bookId } },
    });
    if (existing) {
      throw new BadRequestException(`Book ${bookId} is already linked to Library ${libraryId}`);
    }

    const link = this.libraryBookRepo.create({ library, book, copies });
    await this.libraryBookRepo.save(link);
    return book;
  }

  /**
   * Devuelve todos los libros asociados a una biblioteca
   */
  async findBooksFromLibrary(libraryId: string): Promise<BookEntity[]> {
    const library = await this.libraryRepo.findOne({ where: { id: libraryId } });
    if (!library) {
      throw new NotFoundException(`Library ${libraryId} not found`);
    }

    const links = await this.libraryBookRepo.find({
      where: { library: { id: libraryId } },
      relations: ['book'],
    });
    return links.map(l => l.book);
  }

  /**
   * Devuelve un libro específico de una biblioteca o 404 si no está vinculado
   */
  async findBookFromLibrary(libraryId: string, bookId: string): Promise<BookEntity> {
    const link = await this.libraryBookRepo.findOne({
      where: { library: { id: libraryId }, book: { id: bookId } },
      relations: ['book'],
    });
    if (!link) {
      throw new NotFoundException(`Book ${bookId} is not linked to Library ${libraryId}`);
    }
    return link.book;
  }

  /**
   * Reemplaza la lista de libros de una biblioteca con bookIds nuevos
   */
  async updateBooksFromLibrary(libraryId: string, bookIds: string[]): Promise<BookEntity[]> {
    const library = await this.libraryRepo.findOne({ where: { id: libraryId } });
    if (!library) {
      throw new NotFoundException(`Library ${libraryId} not found`);
    }

    // Verificar existencia de todos los libros
    const books = await this.bookRepo.findBy({ id: In(bookIds) });
    if (books.length !== bookIds.length) {
      throw new NotFoundException(`One or more books not found`);
    }

    // Eliminar asociaciones actuales
    await this.libraryBookRepo.delete({ library: { id: libraryId } });

    // Crear nuevas asociaciones
    const newLinks = bookIds.map(id => 
      this.libraryBookRepo.create({ library, book: books.find(b => b.id === id) })
    );
    await this.libraryBookRepo.save(newLinks);

    return books;
  }

  /**
   * Elimina un libro de una biblioteca o lanza 404 si no existía
   */
  async removeBookFromLibrary(libraryId: string, bookId: string): Promise<void> {
    const result = await this.libraryBookRepo.delete({
      library: { id: libraryId },
      book: { id: bookId },
    });
    if (result.affected === 0) {
      throw new NotFoundException(`Book ${bookId} is not linked to Library ${libraryId}`);
    }
  }
}
