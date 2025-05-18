import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibraryBookEntity } from 'src/library_book/entities/librarybook.entity';
import { BookEntity } from './entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity,
    LibraryBookEntity
  ])], // Add your entities here
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService],
})
export class BookModule {}
