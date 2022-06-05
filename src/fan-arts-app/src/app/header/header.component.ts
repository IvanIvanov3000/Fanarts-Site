@@ -0,0 +1,41 @@
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
    //   this.router.navigate(['/register']);
    // }, 1000);

    setTimeout(() => {

      return window.location.reload();
    }, 1000)
    

  }

}
