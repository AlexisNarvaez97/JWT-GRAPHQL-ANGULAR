import { login } from "./../operations/query";
import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { map } from "rxjs/operators";
import { getUsers, meData } from "../operations/query";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(private apollo: Apollo) {}

  // Lista Usuarios

  getUsers() {
    return this.apollo
      .watchQuery({
        query: getUsers,
        fetchPolicy: "network-only"
      })
      .valueChanges.pipe(
        map((result: any) => {
          return result.data.users;
        })
      );
  }

  // Login

  login(email: string, password: string) {
    return this.apollo
      .watchQuery({
        query: login,
        variables: {
          email,
          password
        },
        fetchPolicy: "network-only"
      })
      .valueChanges.pipe(
        map((result: any) => {
          return result.data.login;
        })
      );
  }

  // Info con el token
  getMe(token: string) {
    return this.apollo
      .watchQuery({
        query: meData,
        fetchPolicy: "network-only",
        context: {
          headers: new HttpHeaders({
            authorization: token
          })
        }
      })
      .valueChanges.pipe(
        map((result: any) => {
          return result.data.me;
        })
      );
  }
}
