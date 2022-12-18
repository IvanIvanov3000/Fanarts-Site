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
  currentUser: any;
  fanArt: FanArt = {
    _id: 1,
    title: '',
    isPublic: true,
    image: '',
    tag: '',
    description: '',
    author: '',
    likes: [],
  }
  loggedIn: boolean = false;
  isOwner: boolean = false;
  isLiked!: boolean ;

  errorMessage = "";


  constructor(
    private fanArtsService: FanArtsService,
    private route: ActivatedRoute,
    public router: Router,
    private tokenService: TokenStorageService,
  ) { }

  ngOnInit() {
    // this.fanArt$ = this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) => {

    //     console.log(params.get('id'));
    //     return this.fanArtsService.getFanArt(params.get('id')!);
    //   }));
    this.currentUser = this.tokenService.getUser();
    const token = this.tokenService.getToken();
    if (token) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
    let id = this.route.snapshot.params['id'];
    this.fanArtsService.getFanArt(id).subscribe(
      data => {
        this.fanArt = data;
        let likes = this.fanArt.likes;
        // this.fanArt.likes = this.fanArt.likes.length;
        let author = data.author._id;

        console.log(likes, this.currentUser.id);
        likes.includes(this.currentUser.id) ? this.isLiked = true : this.isLiked = false;
      

        if (author == this.currentUser.id) {
          this.isOwner = true;
        } else {
          this.isOwner = false;
        }
      },
      err => {
        this.errorMessage = err.message;
        console.log(err);

      });
  }
  onDelete() {
    //window.alert("Are you sure you want to delete this fan art?");
    this.fanArtsService.deleteFanArt(this.fanArt._id).subscribe(
      data => {
        setTimeout(() => {
          this.router.navigate(['/myposts']);
        }, 1000);
      },
      err => {
        console.log(err);
      });
    
  }
  onLike() {
    this.fanArtsService.likeFanArt(this.fanArt.
      _id).subscribe(
        data => {
          console.log(data);
           this.fanArt.likes.push(this.currentUser.id);
           this.isLiked = true;
        },
        err => {

          this.errorMessage = err.error.message || err.message;

          console.log(err);
        });
    // this.router.navigate(['details' ,this.fanArt._id]);



  }
  onDislike() {
    this.fanArtsService.dislikeFanArt(this.fanArt._id).subscribe(
      data => {
        console.log(data);
        // this.fanArt.likes = this.fanArt.likes.filter((fanA : any) => fanA !== this.currentUser.id);
        this.fanArt.likes = data.likes;
        this.isLiked = false;

      },
      err => {
        this.errorMessage = err.error.message || err.message;
        console.log(err);
      });

  }
}
