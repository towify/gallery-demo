import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {UnsplashPhoto} from "./unsplash.photo";

@Injectable({
  providedIn: 'root'
})
export class UnsplashService {

  private unsplashUrl:string = 'https://api.unsplash.com/photos/?client_id=7nb3UsOsIQ8j-rRsSe8FdNrKXGY7B_GorEWoPBpGazU'

  constructor(private http: HttpClient) {
  }

  listPhotos(pageIndex: number): Observable<UnsplashPhoto[]> {
    return this.http.get<UnsplashPhoto[]>(this.unsplashUrl, {params: {page: pageIndex, per_page: 20}})
      .pipe(
        tap(_ => console.log('fetched unsplash photos')),
        catchError(this.handleError<UnsplashPhoto[]>('listPhotos', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
