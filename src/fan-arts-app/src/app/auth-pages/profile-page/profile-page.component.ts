import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TokenStorageService } from '../../_services/token-storage.service';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  currentUser: any;
  numberOfPosts!: Number;

  constructor(private token: TokenStorageService, private authService: AuthService, public router: Router) { }
  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    console.log(this.currentUser.id);
    this.authService.getProfileInfo(this.currentUser.id).subscribe(
      data => {
        console.log(data);
        this.currentUser = data;
        this.currentUser.fanArts = this.currentUser.fanArts.length;
        console.log(this.currentUser);
      },
      err => {
        console.log(err);
      }
    );
  }
}
