import Movie from '../Movie';

describe('Movie Type', () => {
  test('should have correct structure', () => {
    const movie: Movie = {
      id: '1',
      title: 'Test Movie',
      releaseYear: '2023',
    };

    expect(movie.id).toBe('1');
    expect(movie.title).toBe('Test Movie');
    expect(movie.releaseYear).toBe('2023');
  });

  test('should accept different values', () => {
    const movie: Movie = {
      id: '123',
      title: 'Another Movie',
      releaseYear: '2024',
    };

    expect(movie.id).toBe('123');
    expect(movie.title).toBe('Another Movie');
    expect(movie.releaseYear).toBe('2024');
  });

  test('should have all required properties', () => {
    const movie: Movie = {
      id: 'abc',
      title: 'Sample Movie',
      releaseYear: '2022',
    };

    expect(movie).toHaveProperty('id');
    expect(movie).toHaveProperty('title');
    expect(movie).toHaveProperty('releaseYear');
  });

  test('id should be a string', () => {
    const movie: Movie = {
      id: '456',
      title: 'String ID Movie',
      releaseYear: '2021',
    };

    expect(typeof movie.id).toBe('string');
  });

  test('releaseYear should be a string', () => {
    const movie: Movie = {
      id: '789',
      title: 'Release Year Test',
      releaseYear: '2020',
    };

    expect(typeof movie.releaseYear).toBe('string');
  });
});

