import { LibraryBookEntity } from "src/library_book/entities/librarybook.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

// class: BookEntity
@Entity('books')
export class BookEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 150 })
  title: string;

  @Column({ length: 100 })
  author: string;

  @Column({ nullable: true, length: 200 })
  publishedDate?: string;

  @Column({ nullable: true, length: 200 })
  isbn?: string;


  // Relación OneToMany hacia la entidad intermedia LibraryBook (un libro puede tener muchas asociaciones con bibliotecas)
  @OneToMany(() => LibraryBookEntity, (libraryBook) => libraryBook.book)
  libraryBooks: LibraryBookEntity[];
}
