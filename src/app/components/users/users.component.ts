import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { User } from './user.interface';
import { AuthService } from '../../services/auth.service';
import { MeData } from '../me/me.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];

  constructor(private apiService: ApiService, private auth: AuthService) { }

  ngOnInit() {
    this.auth.start();
    this.apiService.getUsers().subscribe(result => {
      // console.log(result);
      this.users = result;
      console.log(this.users);
    });
  }

}
