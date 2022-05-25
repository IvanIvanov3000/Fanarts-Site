import { Component, OnInit } from '@angular/core';



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

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void { }
  onSubmit(): void {
    const { username, email, password, repeatPassword } = this.form;
    console.log(repeatPassword);

    //console.log(username, email, password);
    this.authService.register(username, email, password, repeatPassword)
      .subscribe(
        data => {
          console.log(data);
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);
        },
        err => {
          console.log(err);
          this.errorMessage = err.error.message;
        }
      );
  }


}
