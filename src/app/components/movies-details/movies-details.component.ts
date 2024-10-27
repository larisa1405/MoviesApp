import { Component, OnInit } from '@angular/core';
import { DetailedMovie } from '../models/detailed-movie';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movies-details',
  templateUrl: './movies-details.component.html',
  styleUrls: ['./movies-details.component.scss']
})
export class MoviesDetailsComponent implements OnInit {

  movie!: DetailedMovie;

  public endpointURL = "http://www.omdbapi.com/?apikey=109ae1cc";

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getMovie()
  }

  getMovie() {
    this.route.params.subscribe(params => {
      this.http.get<DetailedMovie>(this.endpointURL + "&i=" + params['imdbID'])
      .subscribe((response: DetailedMovie) => {
        this.movie = response;
      })
    })
  }

}
