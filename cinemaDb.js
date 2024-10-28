use('cinemaDb')

// Create
db.movies.insertMany([
  {
    title: 'Inception',
    genre: 'Sci-Fi',
    director: 'Christopher Nolan',
    releaseYear: 2010,
    duration: 148,
    ratings: [
      { reviewer: 'John Doe', score: 9 },
      { reviewer: 'Jane Smith', score: 8 }
    ],
    cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page'],
    boxOffice: {
      budget: 160000000,
      revenue: 829895144
    },
    country: 'USA',
    tags: ['mind-bending', 'dreams', 'thriller']
  },
  {
    title: 'Parasite',
    genre: 'Drama',
    director: 'Bong Joon-ho',
    releaseYear: 2019,
    duration: 132,
    ratings: [
      { reviewer: 'Alice Brown', score: 10 },
      { reviewer: 'Bob Johnson', score: 9 }
    ],
    cast: ['Song Kang-ho', 'Lee Sun-kyun', 'Cho Yeo-jeong'],
    boxOffice: {
      budget: 11400000,
      revenue: 257000000
    },
    country: 'South Korea',
    tags: ['social', 'dark comedy', 'thriller']
  },
  {
    title: 'The Godfather',
    genre: 'Crime',
    director: 'Francis Ford Coppola',
    releaseYear: 1972,
    duration: 175,
    ratings: [
      { reviewer: 'Chris Evans', score: 10 },
      { reviewer: 'Scarlett Johansson', score: 9 }
    ],
    cast: ['Marlon Brando', 'Al Pacino', 'James Caan'],
    boxOffice: {
      budget: 6000000,
      revenue: 246120974
    },
    country: 'USA',
    tags: ['mafia', 'classic', 'family']
  },
  {
    title: 'Spirited Away',
    genre: 'Animation',
    director: 'Hayao Miyazaki',
    releaseYear: 2001,
    duration: 125,
    ratings: [
      { reviewer: 'Emma Watson', score: 9 },
      { reviewer: 'Daniel Radcliffe', score: 8 }
    ],
    cast: ['Rumi Hiiragi', 'Miyu Irino', 'Mari Natsuki'],
    boxOffice: {
      budget: 19000000,
      revenue: 395800000
    },
    country: 'Japan',
    tags: ['fantasy', 'anime', 'adventure']
  },
  {
    title: 'The Dark Knight',
    genre: 'Action',
    director: 'Christopher Nolan',
    releaseYear: 2008,
    duration: 152,
    ratings: [
      { reviewer: 'Tom Hardy', score: 9 },
      { reviewer: 'Christian Bale', score: 10 }
    ],
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
    boxOffice: {
      budget: 185000000,
      revenue: 1004558444
    },
    country: 'USA',
    tags: ['superhero', 'crime', 'thriller']
  }
])

db.movies.insertMany([
  {
    title: 'Interstellar',
    genre: 'Sci-Fi',
    director: 'Christopher Nolan',
    releaseYear: 2014,
    duration: 169,
    ratings: [
      { reviewer: 'Matthew McConaughey', score: 9 },
      { reviewer: 'Anne Hathaway', score: 8 }
    ],
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
    boxOffice: {
      budget: 165000000,
      revenue: 677471339
    },
    country: 'USA',
    tags: ['space', 'adventure', 'time travel']
  },
  {
    title: 'Pulp Fiction',
    genre: 'Crime',
    director: 'Quentin Tarantino',
    releaseYear: 1994,
    duration: 154,
    ratings: [
      { reviewer: 'Samuel L. Jackson', score: 10 },
      { reviewer: 'Uma Thurman', score: 9 }
    ],
    cast: ['John Travolta', 'Uma Thurman', 'Samuel L. Jackson'],
    boxOffice: {
      budget: 8000000,
      revenue: 213928762
    },
    country: 'USA',
    tags: ['cult', 'dark comedy', 'non-linear']
  }
])

// READ
// Відсортувати фільми за тривалістю у зростаючому порядку та показати тільки назву та тривалість.
db.movies.find({}, { title: 1, duration: 1 }).sort({ duration: 1 })

// Отримати другу сторінку при перегляді по 3 фільми на сторінці, впорядкувавши за роком випуску від найновіших до найстаріших.
db.movies
  .find({}, { title: 1, releaseYear: 1 })
  .sort({ releaseYear: -1 })
  .skip(3)
  .limit(3)

// Знайдіть усі фільми в жанрі "Sci-Fi", *випущені після 2000 року.
db.movies.find({ genre: 'Sci-Fi', releaseYear: { $gt: 2000 } })

// Знайти всі фільми, випущені після 2000 року, і показати тільки їх назву, режисера та рік випуску.
db.movies.find(
  { releaseYear: { $gt: 2000 } },
  { title: 1, director: 1, releaseYear: 1 }
)

// *Знайти фільми режисера "Christopher Nolan", тривалість яких перевищує 150 хвилин.
db.movies.find({ director: 'Christopher Nolan', duration: { $gt: 150 } })

// *Показати другу сторінку результатів для фільмів у жанрі "Action", з 2 фільмами на сторінку.
db.movies.find({ genre: 'Action' }).skip(2).limit(2)

// *Відобразити фільми з бюджетом, більше 10 млн.
db.movies.find({ 'boxOffice.budget': { $gt: 10000000 } })

// *Відобразити фільми з тегами 'thriller' та 'superhero'
db.movies.find({ tags: { $all: ['thriller', 'superhero'] } })

// UPDATE
// Оновити тривалість фільму "Inception" до 150 хвилин.
db.movies.updateOne({ title: 'Inception' }, { $set: { duration: 150 } })

// *Додати новий тег "blockbuster" до фільму "The Dark Knight". (оператор $push)
db.movies.updateOne(
  { title: 'The Dark Knight' },
  { $push: { tags: 'blockbuster' } }
)

// DELETE
// Видалити фільм "The Godfather" з колекції.
db.movies.deleteOne({ title: 'The Godfather' })

// *Видалити всі фільми, випущені до 1980 року.
db.movies.deleteMany({ releaseYear: { $lt: 1980 } })
