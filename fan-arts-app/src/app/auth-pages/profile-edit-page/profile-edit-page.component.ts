import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-profile-edit-page',
  templateUrl: './profile-edit-page.component.html',
  styleUrls: ['./profile-edit-page.component.css']
})
export class ProfileEditPageComponent implements OnInit {

  form: any = {
    _id : null,
    username: null,
    email: null
  };
  errorMessage = "";
  isEditFailed = true;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  // this.fanArtsService.getFanArt(id).subscribe(
  //   data => {
  //     this.form = Object.assign({}, data);
  //     this.form.isPublic = this.form.isPublic == true? "public" : "private";
  //     console.log(this.form);
  //   },

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.authService.getProfileInfo(id).subscribe(
      data => {
        this.form = Object.assign({}, data);
        console.log(this.form);
      },
      err => {
        console.log(err);
      });
  }


  onSubmit(): void {
    const { username, email } = this.form;
    let id = this.route.snapshot.params['id'];
    this.authService.editProfileInfo(id, username, email).subscribe(
      data => {
        console.log(data);
        this.isEditFailed = false;

        setTimeout(() => {
          this.router.navigate(['/profile']);
        }, 1000);

      },
      err => {
        this.isEditFailed = true;

          this.errorMessage = err.error.message || err.message;
        console.log(err);
      }
    );
  }

}
