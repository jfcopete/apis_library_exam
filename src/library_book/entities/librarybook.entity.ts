
import { LibraryEntity } from "src/book/entities/library.entity";
import { BookEntity } from "src/library/library/entities/book.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

// class: LibraryBookEntity
@Entity('library_books')
@Unique(['library', 'book'])
export class LibraryBookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // Relación muchos-a-uno: muchas entradas de asociación pueden tener la misma biblioteca
  @ManyToOne(() => LibraryEntity, (library) => library.libraryBooks, { onDelete: 'CASCADE' })
  library: LibraryEntity;

  // Relación muchos-a-uno: muchas entradas de asociación pueden tener el mismo libro
  @ManyToOne(() => BookEntity, (book) => book.libraryBooks, { onDelete: 'CASCADE' })
  book: BookEntity;

  @Column({ type: 'int', default: 1 })
  copies: number;
}
