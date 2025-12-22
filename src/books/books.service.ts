import { Injectable } from '@nestjs/common';
import { AuthorsService } from '../authors/authors.service';

@Injectable()
export class BooksService {
  private books = [
    // TODO: add some sample books here
  ];

  constructor(private readonly authorsService: AuthorsService) {}
}
