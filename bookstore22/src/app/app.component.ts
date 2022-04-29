import {Component} from '@angular/core';
import {Book} from "./shared/book";
import {AuthentificationService} from "./shared/authentification.service";

@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  constructor(private authService: AuthentificationService) {

  }

  getLoginLabel() {
    if (this.authService.isLoggedIn()) {
      return "Logout";
    } else return "Login";
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
