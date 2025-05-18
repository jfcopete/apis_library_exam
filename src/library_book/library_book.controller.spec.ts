import { Test, TestingModule } from '@nestjs/testing';
import { LibraryBookController } from './library_book.controller';

describe('LibraryBookController', () => {
  let controller: LibraryBookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LibraryBookController],
    }).compile();

    controller = module.get<LibraryBookController>(LibraryBookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
