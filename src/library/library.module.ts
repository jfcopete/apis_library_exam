import { Module } from '@nestjs/common';
import { LibraryController } from './library.controller';
import { LibraryService } from './library.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibraryBookEntity } from 'src/library_book/entities/librarybook.entity';
import { LibraryEntity } from './entities/library.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LibraryEntity,
    LibraryBookEntity
  ])], // Add your entities here
  controllers: [LibraryController],
  providers: [LibraryService],
  exports: [LibraryService],
})
export class LibraryModule {}
