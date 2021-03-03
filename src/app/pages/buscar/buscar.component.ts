import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../../providers/peliculas.service';
import { Movie } from '../../interface/cartelera-response';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  texto:string = '';
  movies:Movie[]=[];

  constructor(private activeRoute: ActivatedRoute,
              private _ps:PeliculasService) { }


  ngOnInit(): void {
  
    this.activeRoute.params.subscribe(resp =>{

      this.texto = resp.texto;
      
      //TODO: Llamar al servicio
      this._ps.buscarPelicula( resp.texto).subscribe( movies =>{
        console.log(movies);
        this.movies = movies;
      });

    });
  }

}
