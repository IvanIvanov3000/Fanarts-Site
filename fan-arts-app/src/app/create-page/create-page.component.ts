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
    this.fanArtsService.create(title, image, isPublic, tag, description)
      .subscribe(
        data => {
          this.isSuccessful = true;
          setTimeout(() => {
            this.router.navigate(['/myposts']);
          }, 1500);

        },
        err => {
          console.log(err);
          this.isSuccessful = false;

          this.errorMessage = err.error.message;
        }
      );
  }

}
