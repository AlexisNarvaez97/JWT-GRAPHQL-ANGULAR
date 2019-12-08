import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../services/api.service";
import { Router } from "@angular/router";
import { MeData } from "./me.interface";

@Component({
  selector: "app-me",
  templateUrl: "./me.component.html",
  styleUrls: ["./me.component.css"]
})
export class MeComponent implements OnInit {

  user: any;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem("tokenJWT") !== null) {
      this.apiService.getMe().subscribe((result: MeData) => {
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
    localStorage.removeItem('tokenJWT');
    this.router.navigate(["/login"]);
  }


}
