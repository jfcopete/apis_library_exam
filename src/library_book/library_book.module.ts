import { Module } from '@nestjs/common';
import { LibraryBookController } from './library_book.controller';
import { LibraryBookService } from './library_book.service';

@Module({
  controllers: [LibraryBookController],
  providers: [LibraryBookService]
})
export class LibraryBookModule {}
