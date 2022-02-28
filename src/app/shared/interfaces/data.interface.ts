export interface Movie {
    id: number,
    title: string,
    poster: string,
    genre: string[],
    year: number,
    duration: number,
    imdbRating: number,
    actors: string[]
    studio: string;
}

export interface Actor {
    id: number,
    first_name: string,
    last_name: string,
    gender: string,
    bornCity: string,
    birthdate: string,
    img: string,
    rating: number,
    movies: [number]
}

export interface Studio {
    id: number,
    name: string,
    country: string,
    createYear: number,
    employees: number,
    rating: number,
    movies: [number]
}