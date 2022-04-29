import {Component, OnInit} from '@angular/core';
import {Book} from "../shared/book";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'bs-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  bookSelected(book: Book) {
    this.router.navigate(['../books', book.isbn], {relativeTo: this.route});
  }
}
