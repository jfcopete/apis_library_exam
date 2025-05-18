import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LibraryBookEntity } from 'src/library_book/entities/librarybook.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookEntity } from './entities/book.entity';

@Injectable()
export class BookService {
    constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepo: Repository<BookEntity>,

    @InjectRepository(LibraryBookEntity)
    private readonly libraryBookRepo: Repository<LibraryBookEntity>,
  ) {}

  /**
   * Crea un nuevo libro validando que publishedDate ≤ hoy
   */
  async create(createDto: CreateBookDto): Promise<BookEntity> {
    const published = new Date(createDto.publishedDate);
    if (published > new Date()) {
      throw new BadRequestException('publishedDate debe ser anterior o igual al día de hoy');
    }
    const book = this.bookRepo.create(createDto);
    return await this.bookRepo.save(book);
  }

  /**
   * Devuelve todos los libros (incluyendo sus asociaciones)
   */
  async findAll(): Promise<BookEntity[]> {
    return this.bookRepo.find({
      relations: ['libraryBooks', 'libraryBooks.library'],
    });
  }

  /**
   * Devuelve un libro por ID o lanza 404
   */
  async findOne(id: string): Promise<BookEntity> {
    const book = await this.bookRepo.findOne({
      where: { id },
      relations: ['libraryBooks', 'libraryBooks.library'],
    });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  /**
   * Actualiza un libro validando publishedDate si viene en el DTO
   */
  async update(id: string, updateDto: UpdateBookDto): Promise<BookEntity> {
    if (updateDto.publishedDate) {
      const published = new Date(updateDto.publishedDate);
      if (published > new Date()) {
        throw new BadRequestException('publishedDate debe ser anterior o igual al día de hoy');
      }
    }
    await this.bookRepo.update(id, updateDto);
    return this.findOne(id);
  }

  /**
   * Elimina un libro por su ID
   */
  async remove(id: string): Promise<void> {
    await this.bookRepo.delete(id);
  }
}
