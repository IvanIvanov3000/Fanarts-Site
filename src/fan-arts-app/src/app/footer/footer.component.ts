import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
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
    return window.location.reload();

  }

}
