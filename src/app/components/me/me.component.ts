import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../services/api.service";
import { Router } from "@angular/router";
import { MeData } from "./me.interface";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: "app-me",
  templateUrl: "./me.component.html",
  styleUrls: ["./me.component.css"]
})
export class MeComponent implements OnInit {

  user: any;

  constructor(private apiService: ApiService, private router: Router, private auth: AuthService) {}

  ngOnInit() {
    if (localStorage.getItem("tokenJWT") !== null) {
      this.auth.getMe().subscribe((result: MeData) => {
        if (result.status) {
          console.log(result.user);
          this.user = result.user;
        } else {
          console.log("TOKEN NO VALIDO");
          localStorage.removeItem('tokenJWT');
          this.logout();
        }
      });
    } else {
      // No hay token
      this.logout();
    }
  }

  logout() {
    this.auth.updateStateSession(false);
    localStorage.removeItem('tokenJWT');
    this.router.navigate(["/login"]);
  }


}
