import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, of, throwError} from 'rxjs';
import {catchError, retry, tap} from 'rxjs/operators';
import {UnsplashPhoto} from "./unsplash.photo";

@Injectable()
export class UnsplashService {
  private unsplashUrl = 'https://api.unsplash.com/'

  constructor(private http: HttpClient) {
  }

  listPhotos(): Observable<UnsplashPhoto[]> {
    return this.http.get<UnsplashPhoto[]>(this.unsplashUrl)
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


