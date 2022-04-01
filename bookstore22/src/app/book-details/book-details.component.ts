import {Component, OnInit} from '@angular/core';
import {BookStoreService} from "../shared/book-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Book} from "../shared/book";
import {BookFactory} from "../shared/book-factory";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'bs-book-details',
  templateUrl: './book-details.component.html',
  styles: []
})
export class BookDetailsComponent implements OnInit {

  book: Book = BookFactory.empty();

  constructor(private bs: BookStoreService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    this.bs.getSingle(params['isbn']).subscribe(b => this.book = b);
  }

  getRating(num: number) {
    return new Array(num);
  }

  removeBook() {
    this.toastr.success("Hello KWM - das Buch wurde gelöscht!", "Buch gelöscht");
    if (confirm("Wollen Sie das Buch wirklich löschen?")) {
      this.bs.remove(this.book.isbn).subscribe(res => this.router.navigate(['../'],
        {relativeTo: this.route}));
    }
  }
}
