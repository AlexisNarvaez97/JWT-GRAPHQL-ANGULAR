import { Component, OnInit } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

import { map } from "rxjs/operators";
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "LoginRegisterJWT";

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    const getUsers = gql`
      query {
        users {
          id
          name
          lastname
          email
          registerDate
        }
      }
    `;
    this.apollo
      .watchQuery({
        query: getUsers,
        fetchPolicy: "network-only"
      })
      .valueChanges.pipe(
        map((result: any) => {
          return result.data.users;
        })
      )
      .subscribe(result => {
        console.log(result);
      });

    const login = gql`
      query login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          status
          message
          token
        }
      }
    `;
    this.apollo
      .watchQuery({
        query: login,
        variables: {
          email: "alexis@hotmail.com",
          password: "12345"
        },
        fetchPolicy: "network-only"
      })
      .valueChanges.pipe(
        map((result: any) => {
          return result.data.login;
        })
      )
      .subscribe(result => {
        console.log(result);
      });

    const meData = gql`
      query {
        me {
          status
          message
          user {
            id
            name
            lastname
            email
            registerDate
          }
        }
      }
    `;
    this.apollo
      .watchQuery({
        query: meData,
        fetchPolicy: "network-only",
        context: {
          headers: new HttpHeaders({
            // tslint:disable-next-line: max-line-length
            authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVkZWM1NGUzNjFmYzg2MzIxODU0NDFmOCIsIm5hbWUiOiJBbGV4aXMiLCJsYXN0bmFtZSI6Ik5hcnZhZXoiLCJlbWFpbCI6ImFsZXhpc0Bob3RtYWlsLmNvbSIsImlkIjoxLCJyZWdpc3RlckRhdGUiOiIyMDE5LTEyLTA3IDE5OjQxOjU1In0sImlhdCI6MTU3NTc3NDYxMSwiZXhwIjoxNTc1ODYxMDExfQ.zAhM6HDUocKyn37j-ogi0fhwMC4G3Lvc1E6ZXd42f1w'
          })
        }
      })
      .valueChanges.pipe(
        map((result: any) => {
          return result.data.me;
        })
      )
      .subscribe(result => {
        console.log(result);
      });
  }
}
