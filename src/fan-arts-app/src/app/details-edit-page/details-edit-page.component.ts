import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';


import { FanArt } from "../fanArts";
import { FanArtsService } from '../_services/fan-arts.service';

@Component({
  selector: 'app-details-edit-page',
  templateUrl: './details-edit-page.component.html',
  styleUrls: ['./details-edit-page.component.css']
})
export class DetailsEditPageComponent implements OnInit {

  // form: any = {
  //   title: null,
  //   image: null,
  //   gender: "Male",
  //   tag: null,
  //   description: null,

  // };
  form$!: Observable<FanArt>;

  isSuccessful = false;
  isCreateFailed = false;
  errorMessage = '';

  constructor(
    private fanArtsService: FanArtsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.form$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) : Observable<FanArt> =>
        this.fanArtsService.getFanArt(params.get('id')!))
    );
    console.log(this.form$);
    // this.fanArtsService.getFanArt(id).subscribe(
    //   data => {
    //     this.form = Object.assign({}, data);
    //     console.log(this.form);
    //   },
    //   err => {
    //     console.log(err);
    //   });
  }
  onSubmit(): void {
    // const { title, image, isPublic, tag, description } = this.form;
    // console.log(title, image, isPublic, tag, description);
    /*
    this.fanArtsService.create(title, image, isPublic, tag, description)
      .subscribe(
        data => {
          this.isSuccessful = true;
          setTimeout(() => {
            this.router.navigate(['/catalog']);
          }, 500);

          setTimeout(() => {
            this.reloadPage();
          }, 2000);
        },
        err => {
          console.log(err);
          this.isSuccessful = false;

          this.errorMessage = err.error.message;
        }
      );
      */
  }
  reloadPage(): void {
    window.location.reload();
  }

}
