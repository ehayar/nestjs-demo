import { Injectable, NotFoundException } from '@nestjs/common';
import { PublishersService } from 'src/publishers/publishers.service';
import { GenresService } from 'src/genres/genres.service';


@Injectable()
export class BooksService {

    constructor(
    private publishersService: PublishersService,
    private genresService: GenresService,
  ) {}

  private books = [
   {
      id: 1,
      name: 'Bible',
      publisherId: 1,
      genreIds: [1],
    },
    {
      id: 2,
      name: 'Curses or Blessings',
      publisherId: 1,
      genreIds: [1],
    },
    {
      id: 3,
      name: 'Math101',
      publisherId: 2,
      genreIds: [3,4],
    },{
      id: 4,
      name: 'History',
      publisherId: 3,
      genreIds: [2],
    },

  ];

  findAll() {
    return this.books;
  }

  findOne(id: number) {
      const book = this.books.find((book) => book.id === id);
      if (!book) {
        throw new NotFoundException(`Book with ID ${id} not found`);
      }
      return book;
    }

  create(book: { name: string; publisherId: number; genreIds: number[]}) {

    this.publishersService.findOne(book.publisherId);

     const genres = this.genresService.findByIds(book.genreIds);
  if (genres.length !== book.genreIds.length) {
    throw new NotFoundException('One or more genres not found');
  }

    const newBook = {
      id: this.books[this.books.length - 1].id + 1,
      ...book,
    };
    this.books.push(newBook);
    return newBook;
  }

  update(id: number, book: { name?: string; publisherId?: number; genreIds: number[]}) {
    const bookIndex = this.books.findIndex((book) => book.id === id);

    if (bookIndex === -1) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    if (book.publisherId !== undefined) {
    this.publishersService.findOne(book.publisherId);
    }
    if (book.genreIds !== undefined) {
    const genres = this.genresService.findByIds(book.genreIds);
    if (genres.length !== book.genreIds.length) {
      throw new NotFoundException('One or more genres not found');
    }
  }

    this.books[bookIndex] = {
      ...this.books[bookIndex],
      ...book,
    };
    return this.books[bookIndex];
  }
  delete(id: number) {
    const bookIndex = this.books.findIndex((book) => book.id === id);
    if (bookIndex === -1) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    this.books.splice(bookIndex, 1);

    return bookIndex;
  }
  
}
