import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import jwtDecode from "jwt-decode";

interface Token {
  expiration_date: number,
  user: {
    id: string
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private api: string = "http://bookstore22.s1910456008.student.kwmhgb.at/api/auth"

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string) {
    return this.http.post(`${this.api}/login`, {
      email: email,
      password: password
    });
  }

  logout() {
    this.http.post(`${this.api}/logout`, {});
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    console.log("logged out")
  }

  public setSessionStorage(token: string) {
    const decodeToken = jwtDecode(token) as Token;
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("userId", decodeToken.user.id)
  }

  public getCurrentUserId() {
    return Number.parseInt(<string>sessionStorage.getItem("userId"));
  }

  isLoggedIn() {
    if (sessionStorage.getItem("token")) {
      let token: string = <string>sessionStorage.getItem("token");
      const decodedToken = jwtDecode(token) as Token;
      let expirationDate: Date = new Date(0);
      expirationDate.setUTCDate(decodedToken.expiration_date);
      if (expirationDate < new Date()) {
        console.info("Token expired");
        sessionStorage.removeItem("token");
        return false;
      } else return true;
    }
    return false;
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }
}
