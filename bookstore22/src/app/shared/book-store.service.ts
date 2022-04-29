import {Injectable} from '@angular/core';
import {Author, Book, Image} from "./book";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class BookStoreService {

  private api = 'http://bookstore22.s1910456008.student.kwmhgb.at/api';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Array<Book>> {
    return this.http.get<Array<Book>>(`${this.api}/books`)
      .pipe(retry(3)).pipe(catchError(BookStoreService.errorHandler));
  }

  getSingle(isbn: string): Observable<Book> {
    return this.http.get<Book>(`${this.api}/books/${isbn}`)
      .pipe(retry(3)).pipe(catchError(BookStoreService.errorHandler));
  }

  create(book: Book): Observable<any> {
    return this.http.post(`${this.api}/books`, book)
      .pipe(retry(3)).pipe(catchError(BookStoreService.errorHandler));
  }

  update(book: Book): Observable<any> {
    return this.http.put(`${this.api}/books/${book.isbn}`, book)
      .pipe(retry(3)).pipe(catchError(BookStoreService.errorHandler));
  }

  remove(isbn: string): Observable<Book> {
    return this.http.delete<Book>(`${this.api}/books/${isbn}`)
      .pipe(retry(3)).pipe(catchError(BookStoreService.errorHandler));
  }

  getAllSearch(searchTerm: string): Observable<Array<Book>> {
    return this.http.get<Array<Book>>(`${this.api}/books/search/${searchTerm}`)
      .pipe(retry(3)).pipe(catchError(BookStoreService.errorHandler));
  }

  private static errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
