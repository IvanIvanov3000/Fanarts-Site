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

    if (token) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  onLogout() {
    this.tokenStorage.logOut();
    // setTimeout(() => {
    //     console.log("Delayed for 1 second.");
    //   this.router.navigate(['/register']);
    // }, 1000);

    // setTimeout(() => {

    //   this.reloadPage();
    //   console.log("Delayed for 3 second.");
    // }, 3000)
    return window.location.reload();

  }

}
