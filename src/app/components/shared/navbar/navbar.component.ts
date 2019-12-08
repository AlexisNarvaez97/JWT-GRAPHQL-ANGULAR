import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../services/auth.service";
import { MeData } from "../../me/me.interface";
import { Router } from '@angular/router';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  access: boolean;

  constructor(private auth: AuthService, private router: Router) {
    this.auth.accessVar$.subscribe((data: boolean) => {
      console.log("session state", data);

      if (data === false && this.access) {
        this.access = false;
        this.logout();
      } else {
        this.access = data;
      }

    });
  }

  logout() {
    this.auth.updateStateSession(false);
    localStorage.removeItem('tokenJWT');
    const currentUser = this.router.url;
    if (currentUser !== '/register' && currentUser !== '/users') {
      this.router.navigate(['/login']);
    }
    // console.log(currentUser);
  }

  ngOnInit() {
    if (localStorage.getItem("tokenJWT") !== null) {
      this.auth.getMe().subscribe((result: MeData) => {
        if (result.status) {
          // console.log(result.user);
          this.access = true;
        } else {
          this.access = false;
        }
      });
    } else {
      // No hay token
      this.access = false;
    }
  }
}
