import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MeData } from '../../components/me/me.interface';
import { RegisterData, RegisterResult } from './register.interface';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  operation: number;
  message: string;

  user: RegisterData = {
    name: '',
    lastname: '',
    email: '',
    password: ''
  };

  constructor(private auth: AuthService, private apiService: ApiService) { }

  ngOnInit() {
    this.auth.start();
  }

  register() {
    console.log(this.user);
    this.apiService.register(this.user).subscribe(({data}) => {
      console.log(data);
      const userResult: RegisterResult = data.register;
      if (userResult.status) {
        this.operation = 1;
      } else {
        this.operation = 2;
      }
      this.message = userResult.message;
    }, (error) => {
      console.log('error', error);
      this.operation = 3;
      this.message = 'Error inesperado';
    });
  }

}
