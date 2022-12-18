import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TokenStorageService } from '../../_services/token-storage.service';
import { AuthService } from '../../_services/auth.service';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null,
    repeatPassword: null
  };
  passwordsMatch = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, public router: Router) { }

  ngOnInit(): void {
    const user = this.tokenStorage.getToken();
    if (user) {
      this.isSuccessful = true;
    }
    else{
      this.isSuccessful = false;

    }
  }
  onSubmit(): void {
    const { username, email, password, repeatPassword } = this.form;

    this.authService.register(username, email, password, repeatPassword)
      .subscribe(
        data => {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);
          this.isSignUpFailed = false;
          this.isSuccessful = true;
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 1000);
        },
        err => {
          console.log(err);
          this.isSignUpFailed = true;
          this.errorMessage = err.error.message;
        }
      );
  }

}
