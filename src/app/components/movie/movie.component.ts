import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie.model';
import { MovieList } from '../models/movie-list.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  movie!: Movie[];
  result!: MovieList;
  searchValue!: string;
  currentPage!: number;
  numberOfPages: number | undefined;

  public endpointURL = "http://www.omdbapi.com/?apikey=109ae1cc";
  movies!: Movie[];

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() {
    this.route.params.subscribe(params => {
      this.http.get<MovieList>(this.endpointURL + "&s=" + params['searchValue'] + "&page=" + params['page'])
        .subscribe((response: MovieList) => {
          this.result = response;
          this.movies = this.result.Search;
          this.currentPage = params['page'];
          this.searchValue = params['searchValue'];
          this.numberOfPages = Math.floor(this.result.totalResults / 10) + 1
          console.log(this.result.Error)
        })
    })
  }

  onNextClick(){
    this.currentPage++;
    this.getMovies();
    window.scroll(0,0);
    this.router.navigate(["search/" + this.searchValue + "/" + this.currentPage]);
  }

  onPreviousClick(){
    this.currentPage--;
    this.getMovies();
    window.scroll(0,0);
    this.router.navigate(["search/" + this.searchValue + "/" + this.currentPage]);
  }

  goToMovie(imdbID: string){
    this.router.navigate(["movie/" + imdbID]);
  }


}
