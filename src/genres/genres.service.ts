import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class GenresService {
  private genres = [
    { id: 1, name: 'Religious' },
    { id: 2, name: 'History' },
    { id: 3, name: 'Educational' },
    { id: 4, name: 'Science' },
  ];

  findAll() {
    return this.genres;
  }

  findOne(id: number) {
    const genre = this.genres.find((g) => g.id === id);
    if (!genre) {
      throw new NotFoundException('Genre not found');
    }
    return genre;
  }

  // IMPORTANT helper: validate an array of ids
  findByIds(ids: number[]) {
    return this.genres.filter((g) => ids.includes(g.id));
  }
}
