import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {debounceTime, distinctUntilChanged, filter, switchMap, tap} from "rxjs";
import {BookStoreService} from "../shared/book-store.service";
import {Book} from "../shared/book";

@Component({
  selector: 'bs-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  keyup = new EventEmitter<string>();
  foundBooks: Book[] = [];
  isLoading = false;

  @Output() bookSelected = new EventEmitter<Book>();

  constructor(private bs: BookStoreService) {
  }

  ngOnInit(): void {
    this.keyup.pipe(filter(term => term != ""))
      .pipe(debounceTime(500))
      .pipe(tap(() => this.isLoading = true))
      .pipe(distinctUntilChanged())
      .pipe(switchMap(searchTerm => this.bs.getAllSearch(searchTerm)))
      .pipe(tap(() => this.isLoading = false))
      .subscribe(books => {
        console.log(books);
        this.foundBooks = books;
      });
  }

}
