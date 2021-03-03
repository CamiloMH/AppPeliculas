import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculasService } from '../../providers/peliculas.service';
import { MovieDetails } from '../../interface/movie-details';
import { Location } from '@angular/common';
import { Cast } from '../../interface/cast-response';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  movie : MovieDetails;
  cast : Cast[] = [];

  constructor(private activatedRoute:ActivatedRoute,
              private _ps:PeliculasService,
              private location: Location,
              private router: Router) { }

  ngOnInit(): void {

    const { id } = this.activatedRoute.snapshot.params;


    combineLatest([

      this._ps.getPeliculaDetails(id),
      this._ps.getCast( id )

    ]).subscribe( ([movie, cast]) =>{
      
      if(!movie){
        return this.router.navigateByUrl('/home');
      }
      this.movie = movie;
      this.cast = cast.filter( actor => actor.profile_path !== null);

    });
    
    // this._ps.getPeliculaDetails(id).subscribe( movie => {
      // if(!movie){
      //   return this.router.navigateByUrl('/home');
      // }
      // this.movie = movie;
    // });

    // this._ps.getCast( id ).subscribe( cast => {
      
    //   this.cast = cast.filter( actor => actor.profile_path !== null)
    // });
  }

  onRegresar(){
    this.location.back();
  }

}
