import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { PeliculasService } from '../../providers/peliculas.service';
import { Movie } from '../../interface/cartelera-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public movies: Movie[]=[];
  public moviesSlideShow: Movie[]=[];

  @HostListener('window:scroll',['$event'])
  onScroll(){
    
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1300;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);
    

    if(pos > max){
      //TODO llamar servicio

      if(this._ps.loading){return;}
      this._ps.getCartelera().subscribe(resp =>{
        this.movies.push(...resp);
      });
    }


  }

  constructor(private _ps:PeliculasService) { }

  ngOnInit(): void {

    this._ps.getCartelera().subscribe(resp =>{
      // console.log(resp.results);
      this.movies = resp;
      this.moviesSlideShow = resp;
    });
  }

  ngOnDestroy(){
    this._ps.resetCarteleraPage();
  }

}
