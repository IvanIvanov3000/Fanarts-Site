import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;

  constructor(private tokenStorage: TokenStorageService, public router: Router) { }

  ngOnInit() {
    const token = this.tokenStorage.getToken();
    console.log(token);

    if (token) {
      this.isLoggedIn = true;
      console.log(this.isLoggedIn, "--is logged in");
    } else {
      this.isLoggedIn = false;
      console.log(this.isLoggedIn, "--is logged in");

    }
  }

  onLogout() {
    this.tokenStorage.logOut();
    this.router.navigate(['/']);
    return;
  }

}
