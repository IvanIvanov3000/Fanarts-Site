import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FanArtsService } from '../_services/fan-arts.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css']
})
export class CreatePageComponent implements OnInit {

  form: any = {
    title: null,
    image: null,
    isPublic: null,
    tag: null,
    description: null,

  };
  isSuccessful = false;
  isCreateFailed = false;
  errorMessage = '';

  constructor(private fanArtsService: FanArtsService, public router: Router) { }

  ngOnInit(): void { }

  onSubmit(): void {
    const { title, image, isPublic, tag, description } = this.form;

    console.log(title, image, isPublic, tag, description);
    this.fanArtsService.create(title, image, isPublic, tag, description)
      .subscribe(
        data => {
          console.log(data);
          setTimeout(() => {
            this.router.navigate(['/']);
            console.log("Delayed for 0.5 second.");
          }, 500);

          setTimeout(() => {
            this.reloadPage();

            console.log("Delayed for 2 second.");
          }, 2000);
        },
        err => {
          console.log(err);
          this.errorMessage = err.error.message;
        }
      );
  }
  reloadPage(): void {
    window.location.reload();
  }

}
