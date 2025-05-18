import { LibraryBookEntity } from "src/library_book/entities/librarybook.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('libraries')
export class LibraryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ nullable: true, length: 200 })
  location?: string;

  // Relación OneToMany hacia la entidad intermedia LibraryBook (una biblioteca tiene muchas asociaciones a libros)
  @OneToMany(() => LibraryBookEntity, (libraryBook) => libraryBook.library, { cascade: true })
  libraryBooks: LibraryBookEntity[];
}