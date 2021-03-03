import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, pipe } from 'rxjs';
import {  catchError, map, tap } from 'rxjs/operators';
import { CarteleraResponse, Movie } from '../interface/cartelera-response';
import { MovieDetails } from '../interface/movie-details';
import { Cast, CastResponse } from '../interface/cast-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {


  private baseUrl: string = 'https://api.themoviedb.org/3';
  private carteleraPage: number = 1;
  public loading: boolean = false;

  constructor(private http: HttpClient) { }

  get params(){
    return{
      api_key: '994c85494e1ed939a37576dbf5d22eb5',
      language : 'es-ES',
      page: this.carteleraPage.toString()

    }
  }

  resetCarteleraPage(){
    this.carteleraPage = 1;
  }


  getCartelera():Observable<Movie[]>{

    if( this.loading){
      //cargando peliculas
      return of ([]);
    }

    this.loading = true;

    return this.http.get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing?`,{
      params: this.params
    }).pipe(
      map( (resp) => resp.results),
      tap( () =>{
        this.carteleraPage += 1;
        this.loading = false;
      })
    )
  }

  getPeliculaDetails( id:string){
    
    return this.http.get<MovieDetails>(`${this.baseUrl}/movie/${id}`,{
      params: this.params
    }).pipe(
      catchError( err => of(null))
    )
  }

  getCast(id:string):Observable<Cast[]>{
    return this.http.get<CastResponse>(`${this.baseUrl}/movie/${id}/credits`,{
      params: this.params
    }).pipe(
      map( resp => resp.cast),
      catchError( err => of([]))
    );
  }

  buscarPelicula(texto:string):Observable<Movie[]>{

    const params = {...this.params, page:'1', query: texto};

    //https://api.themoviedb.org/3/search/movie
     return this.http.get<CarteleraResponse>(`${this.baseUrl}/search/movie`,{
      params
    }).pipe(
      map( resp=> resp.results)
    )
  }




}
