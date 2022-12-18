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

  form: any = {
    title: null,
    image: null,
    isPublic: null,
    tag: null,
    description: null,

  };
  //form!: Observable<FanArt>;

  isSuccessful = false;
  isCreateFailed = false;
  errorMessage = '';

  constructor(
    private fanArtsService: FanArtsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    // this.form$ = this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) : Observable<FanArt> =>
    //     this.fanArtsService.getFanArt(params.get('id')!))
    // );
    // console.log(this.form$);
    let id = this.route.snapshot.params['id'];
    this.fanArtsService.getFanArt(id).subscribe(
      data => {
        this.form = Object.assign({}, data);
        this.form.isPublic = this.form.isPublic == true ? "public" : "private";
        console.log(this.form);
      },
      err => {
        console.log(err);
      });
  }
  onSubmit(): void {
    let id = this.route.snapshot.params['id'];
    let { title, image, isPublic, tag, description } = this.form;
    isPublic = isPublic == "public" ? true : false;

    this.fanArtsService.edit(id, title, image, isPublic, tag, description)
      .subscribe(
        data => {
          this.isSuccessful = true;

          this.router.navigate(['/details/' + id]);

        },
        err => {
          console.log(err);
          this.isSuccessful = false;

          this.errorMessage = err.error.message;
        }
      );
  }


}
