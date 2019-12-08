import { Component, OnInit } from "@angular/core";
import { LoginData, LoginResult } from "./login.interface";
import { ApiService } from "../../services/api.service";
import { Router } from "@angular/router";
import { MeData } from '../me/me.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  user: LoginData = {
    email: "",
    password: ""
  };

  error: boolean;

  show: boolean;

  constructor(private apiService: ApiService, private router: Router, private authService: AuthService) {
    this.authService.userVar$.subscribe((data: MeData) => {
      if (data === null || data.status === false) {
        this.show = true;
      } else {
        this.show = false;
      }
    });
  }

  ngOnInit() {
    this.authService.start();
  }

  save() {
    this.apiService
      .login(this.user.email, this.user.password)
      .subscribe((result: LoginResult) => {
        this.show = true;
        // console.log(result);
        if (result.status) {
          this.error = false;
          localStorage.setItem("tokenJWT", result.token);
          console.log("Login Correcto");
          this.authService.updateStateSession(true);
          this.router.navigate(["/me"]);
        } else {
          this.error = true;
          this.authService.updateStateSession(false);
          localStorage.removeItem("tokenJWT");
          console.log("Login Incorrecto");
        }
      });
  }
}
