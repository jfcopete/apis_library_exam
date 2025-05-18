import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LibraryEntity } from 'src/book/entities/library.entity';
import { LibraryBookEntity } from 'src/library_book/entities/librarybook.entity';
import { Repository } from 'typeorm';
import { CreateLibraryDto } from './dto/create-library.dto';
import { UpdateLibraryDto } from './dto/update-library.dto';

@Injectable()
export class LibraryService {constructor(
    @InjectRepository(LibraryEntity)
    private libraryRepo: Repository<LibraryEntity>,
    @InjectRepository(LibraryBookEntity)
    private libraryBookRepo: Repository<LibraryBookEntity>,
  ) {}

  async create(createDto: CreateLibraryDto): Promise<LibraryEntity> {
    const library = this.libraryRepo.create(createDto);
    return await this.libraryRepo.save(library);
  }

  async findAll(): Promise<LibraryEntity[]> {
    return await this.libraryRepo.find({
      relations: ['libraryBooks', 'libraryBooks.book'],  // traer también los libros asociados
    });
  }

async findOne(id: string): Promise<LibraryEntity> {
    const library = await this.libraryRepo.findOne({
      where: { id },
      relations: ['libraryBooks', 'libraryBooks.book'],
    });
    // Si no existe, lanzamos excepción HTTP 404
    if (!library) {
      throw new NotFoundException(`Library with ID ${id} not found`);
    }
    return library;
  }

  async update(id: string, updateDto: UpdateLibraryDto): Promise<LibraryEntity> {
    await this.libraryRepo.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.libraryRepo.delete(id);
  }}
