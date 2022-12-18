import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService, public router: Router) { }

  ngOnInit() {}

  loggedIn(){
    const token = this.tokenStorage.getToken();

    if (token) {
      return true;
    } else {
      return false;
    }
  }

  onLogout() {
    this.tokenStorage.logOut();
  }

}
