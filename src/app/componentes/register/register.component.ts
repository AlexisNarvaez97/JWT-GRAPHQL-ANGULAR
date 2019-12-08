import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MeData } from '../../components/me/me.interface';
import { RegisterData } from './register.interface';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: RegisterData = {
    name: '',
    lastname: '',
    email: '',
    password: ''
  };

  constructor(private auth: AuthService, private apiService: ApiService) { }

  ngOnInit() {
    if (localStorage.getItem("tokenJWT") !== null) {
      this.auth.getMe().subscribe((result: MeData) => {
        if (result.status) {
          this.auth.updateStateSession(true);
        } else {
          this.auth.updateStateSession(false);
        }
      });
    } else {
      this.auth.updateStateSession(false);
    }
  }

  register() {
    console.log(this.user);
    this.apiService.register(this.user).subscribe(({data}) => {
      console.log(data);
    }, (error) => {
      console.log('error', error);
    });
  }

}
