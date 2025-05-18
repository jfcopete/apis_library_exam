// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
//import { LibrariesModule } from './libraries/libraries.module';
//import { BooksModule } from './books/books.module';
//import { LibraryBooksModule } from './library-books/library-books.module';
import { BookModule } from './book/book.module';
import { LibraryModule } from './library/library.module';
import { LibraryBookModule } from './library_book/library_book.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (cfg: ConfigService) => {
    const host     = cfg.get('POSTGRES_HOST');
    const port     = cfg.get('POSTGRES_PORT');
    const username = cfg.get('POSTGRES_USER');
    const password = cfg.get('POSTGRES_PASSWORD');
    const database = cfg.get('POSTGRES_DB');

    console.log('→ DB HOST:',     host,     typeof host);
    console.log('→ DB PORT:',     port,     typeof port);
    console.log('→ DB USER:',     username, typeof username);
    console.log('→ DB PASS:',     password, typeof password);
    console.log('→ DB NAME:',     database, typeof database);

    return {
      type: 'postgres',
      host:     host as string,
      port:     Number(port) || 5432,
      username: username as string,
      password: password as string,
      database: database as string,
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: true,
      logging: true,
    
      };
  },
    }),
    BookModule,
    LibraryModule,
    LibraryBookModule,
    // … your feature modules
  ],
  controllers: [],
  providers: [],
})
export class AppModule {} // class: AppModule