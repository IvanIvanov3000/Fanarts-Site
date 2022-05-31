//import { switchMap } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
//import { Observable } from 'rxjs';

import { FanArt } from "../fanArts";
import { FanArtsService } from '../_services/fan-arts.service';
import { TokenStorageService } from '../_services/token-storage.service';



@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent implements OnInit {

  fanArt: FanArt = {
    _id: 1,
    title: '',
    isPublic: true,
    image: '',
    tag: '',
    description: '',
    author: ''
  }
  isOwner: boolean = false;
  show!: boolean;

  constructor(
    private fanArtsService: FanArtsService,
    private route: ActivatedRoute,
    private router: Router,
    private tokenService: TokenStorageService,
  ) { }

  ngOnInit() {
    // this.fanArt$ = this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) => {

    //     console.log(params.get('id'));
    //     return this.fanArtsService.getFanArt(params.get('id')!);
    //   }));
    const currentUser = this.tokenService.getUser();

    let id = this.route.snapshot.params['id'];
    this.fanArtsService.getFanArt(id).subscribe(
      data => {
        this.fanArt = data;
        let author = data.author._id;
        let id = currentUser.id;

        if (author == id) {
          this.isOwner = true;
        } else {
          this.isOwner = false;
        }
        this.show = this.fanArt.isPublic;
      },
      err => {
        console.log(err);
      });


  }


}
