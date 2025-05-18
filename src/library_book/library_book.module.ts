import { Module } from '@nestjs/common';
import { LibraryBookController } from './library_book.controller';
import { LibraryBookService } from './library_book.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibraryBookEntity } from './entities/librarybook.entity';
import { BookEntity } from 'src/book/entities/book.entity';
import { LibraryEntity } from 'src/library/entities/library.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LibraryBookEntity,
    BookEntity,
    LibraryEntity
  ])], // Add your entities here
  controllers: [LibraryBookController],
  providers: [LibraryBookService],
  exports: [LibraryBookService],
})
export class LibraryBookModule {}
