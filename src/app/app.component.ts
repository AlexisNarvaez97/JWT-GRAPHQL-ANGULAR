import { Component, OnInit } from "@angular/core";
import { ApiService } from "./services/api.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "LoginRegisterJWT";

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getUsers().subscribe(result => {
      console.log(result);
    });

    this.apiService
      .getMe(
        // tslint:disable-next-line: max-line-length
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVkZWM1NGUzNjFmYzg2MzIxODU0NDFmOCIsIm5hbWUiOiJBbGV4aXMiLCJsYXN0bmFtZSI6Ik5hcnZhZXoiLCJlbWFpbCI6ImFsZXhpc0Bob3RtYWlsLmNvbSIsImlkIjoxLCJyZWdpc3RlckRhdGUiOiIyMDE5LTEyLTA3IDE5OjQxOjU1In0sImlhdCI6MTU3NTc3NDYxMSwiZXhwIjoxNTc1ODYxMDExfQ.zAhM6HDUocKyn37j-ogi0fhwMC4G3Lvc1E6ZXd42f1w"
      )
      .subscribe(result => {
        console.log(result);
      });
  }
}
