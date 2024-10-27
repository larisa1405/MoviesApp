import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Movie } from '../models/movie.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  searchValue: string = '';

  favoriteMoviesId: string[] = ['tt0120689', 'tt1478839', 'tt0268978', 'tt0816692', 'tt0109830']
  favoriteMovies: Movie[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.favoriteMoviesId.forEach((value) => {
      this.http.get<Movie>('http://www.omdbapi.com/?apikey=109ae1cc&i=' + value)
        .subscribe((response: Movie) => {
          this.favoriteMovies.push(response);
        })
    })
  }

  searchMovie() {
    if (this.searchValue) {
      this.router.navigate(["search/" + this.searchValue + '/1'])
    }
  }

  goToMovie(imdbID: string){
    this.router.navigate(["movie/" + imdbID]);
    window.scroll(0,0);
  }

}
