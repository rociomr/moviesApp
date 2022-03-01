import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MoviesAppService } from './movies-app.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

fdescribe('MoviesAppService', () => {
  let movieAppService: MoviesAppService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        MoviesAppService
      ],
    });
    router = TestBed.inject(Router);
  });

  function setup() {
    const movieAppService = TestBed.inject(MoviesAppService);
    const httpTestingController = TestBed.inject(HttpTestingController);
    return { movieAppService, httpTestingController };
  }

  it('should be created', () => {
    const { movieAppService  } = setup();
    expect(movieAppService).toBeTruthy();
  });

  // Petición GET a endpoint para getActorsList
  it('should getActorsList',() => {
    const { movieAppService, httpTestingController } = setup();
    // Creación de variables
    const configDomain = 'http://localhost:3000/actors';
 
    const payload = 
      [{
        "id": 1,
        "first_name": "Isaak",
        "last_name": "McQuode",
        "gender": "Male",
        "bornCity": "Ciduren",
        "birthdate": "24/12/1957",
        "img": "http://dummyimage.com/600x400.png/dddddd/000000",
        "rating": 2.03,
        "movies": [3,7]
      }];
    
    // Se realiza la petición
    movieAppService.getActorsList().then((data:any) =>{
      expect(data).toBe(payload);
    })

    const req = httpTestingController.expectOne( `${configDomain}`);
    expect(req.request.method).toBe('GET');
    // Respuesta del mock
    req.flush(payload);
  });

  // Petición GET a endpoint para getStudiosList
  it('should getStudiosList',() => {
    const { movieAppService, httpTestingController } = setup();
    // Creación de variables
    const configDomain = 'http://localhost:3000/companies';
 
    const payload = 
      [{
        "id": 1,
        "name": "Jacobson-Dickinson",
        "country": "Colombia",
        "createYear": 2010,
        "employees": 81,
        "rating": 4.32,
        "movies": [1, 10]
      }];
    
    // Se realiza la petición
    movieAppService.getStudiosList().then((data:any) =>{
      expect(data).toBe(payload);
    })

    const req = httpTestingController.expectOne( `${configDomain}`);
    expect(req.request.method).toBe('GET');
    // Respuesta del mock
    req.flush(payload);
  });

  it('should getSelectedMovie',() => {
    const { movieAppService, httpTestingController } = setup();
    // Creación de variables
    const id = 1;
    const configDomain = 'http://localhost:3000/movies/'+id;
    const payload = 
      [{
        "id": 1,
        "title": "Dancing Lady",
        "poster": "http://dummyimage.com/400x600.png/cc0000/ffffff",
        "genre": ["Comedy, Musical"],
        "year": 2006,
        "duration": 161,
        "imdbRating": 8.27,
        "actors": [4,5,6]
      }];
    
    // Se realiza la petición
    movieAppService.getSelectedMovie(id).then((data:any) =>{
      expect(data).toBe(payload);
    })

    const req = httpTestingController.expectOne( `${configDomain}`);
    expect(req.request.method).toBe('GET');
    // Respuesta del mock
    req.flush(payload);
  });

  it('should getNamesActorsMovieSelected',() => {
    const { movieAppService, httpTestingController } = setup();
    // Creación de variables
    const actorsList = 
      [{
        "id": 1,
        "first_name": "Isaak",
        "last_name": "McQuode",
        "gender": "Male",
        "bornCity": "Ciduren",
        "birthdate": "24/12/1957",
        "img": "http://dummyimage.com/600x400.png/dddddd/000000",
        "rating": 2.03,
        "movies": [3,7]
      }];
    const selectedMovie = 
      {
        "id": 1,
        "title": "Dancing Lady",
        "poster": "http://dummyimage.com/400x600.png/cc0000/ffffff",
        "genre": ["Comedy, Musical"],
        "year": 2006,
        "duration": 161,
        "imdbRating": 8.27,
        "actors": [4,5,6]
      };
    
    // Se realiza la petición
    movieAppService.getNamesActorsMovieSelected(actorsList, selectedMovie);
    expect(movieAppService).toBeTruthy();
  });

  it('should getStudioMovieSelected',() => {
    const { movieAppService} = setup();
    // Creación de variables
   
    const selectedMovie = [{
      "id": 1,
      "title": "Dancing Lady",
      "poster": "http://dummyimage.com/400x600.png/cc0000/ffffff",
      "genre": ["Comedy, Musical"],
      "year": 2006,
      "duration": 161,
      "imdbRating": 8.27,
      "actors": [4,5,6]
    }];
    const studiosList = [{
      "id": 1,
      "name": "Jacobson-Dickinson",
      "country": "Colombia",
      "createYear": 2010,
      "employees": 81,
      "rating": 4.32,
      "movies": [1,10]
    }]
    
    spyOn(movieAppService, 'getStudiosList').and.returnValue(Promise.resolve(studiosList));
    // Se realiza la petición
    movieAppService.getStudioMovieSelected(selectedMovie);

    expect(movieAppService).toBeTruthy();
  });

  it('should getSelectedMovies',() => {
    const { movieAppService} = setup();
    // Creación de variables
  
    // Se realiza la llamada
    movieAppService.getSelectedMovies();

    expect(movieAppService).toBeTruthy();
  });

  it('should getNextID',() => {
    const { movieAppService } = setup();
    // Creación de variables
  
    // Se realiza la llamada
    movieAppService.getNextID();

    expect(movieAppService).toBeTruthy();
  });

  it('should setNextID',() => {
    const { movieAppService } = setup();
    // Creación de variables
    const id= 1
    // Se realiza la llamada
    movieAppService.setNextID(id);

    expect(movieAppService).toBeTruthy();
  });

  // Petición GET a endpoint para addMovie
  it('should addMovie',() => {
    const { movieAppService, httpTestingController } = setup();
    const movie = [{
      "id": 1,
      "title": "Dancing Lady",
      "poster": "http://dummyimage.com/400x600.png/cc0000/ffffff",
      "genre": ["Comedy, Musical"],
      "year": 2006,
      "duration": 161,
      "imdbRating": 8.27,
      "actors": [4,5,6]
    }];
    // Creación de variables
    const configDomain = 'http://localhost:3000/movies';
   
    // Se realiza la petición
    movieAppService.addMovie(movie).subscribe((data:any) =>{
      expect(data).toBe('success');
    })

    const req = httpTestingController.expectOne( `${configDomain}`);
    expect(req.request.method).toBe('POST');
    // Respuesta del mock
    req.flush('success');
  });

  // Petición PUT a endpoint para editMovie
  it('should editMovie',() => {
    const { movieAppService, httpTestingController } = setup();
    const movie = {
      "id": 1,
      "title": "Dancing Lady",
      "poster": "http://dummyimage.com/400x600.png/cc0000/ffffff",
      "genre": ["Comedy, Musical"],
      "year": 2006,
      "duration": 161,
      "imdbRating": 8.27,
      "actors": [4,5,6]
    };
    // Creación de variables
    const configDomain = 'http://localhost:3000/movies/1';
   
    // Se realiza la petición
    movieAppService.editMovie(movie).subscribe((data:any) =>{
      expect(data).toBe(configDomain);
    })

    const req = httpTestingController.expectOne( `${configDomain}`);
    expect(req.request.method).toBe('PUT');
    // Respuesta del mock
    req.flush(configDomain);
  });

   // Petición DELETE a endpoint para removeMovie
  it('should removeMovie',() => {
    const { movieAppService, httpTestingController } = setup();
    // Creación de variables
    const configDomain = 'http://localhost:3000/movies/1';
   
    // Se realiza la petición
    movieAppService.removeMovie(1).subscribe((data:any) =>{
      expect(data).toBe(configDomain);
    })

    const req = httpTestingController.expectOne( `${configDomain}`);
    expect(req.request.method).toBe('DELETE');
    // Respuesta del mock
    req.flush(configDomain);
  });

 
  it('should getMoviesList',() => {
    const { movieAppService} = setup();

    // Se realiza la llamada
    movieAppService.getMoviesList();

    expect(movieAppService).toBeTruthy();
  });
});
