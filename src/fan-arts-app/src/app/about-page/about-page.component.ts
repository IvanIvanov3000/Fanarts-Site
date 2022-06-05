import { Component, OnInit } from '@angular/core';

import { TokenStorageService } from '../_services/token-storage.service'

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent implements OnInit {

  audio!: any;
  isLoggedIn: boolean = false;
  constructor(private tokenService: TokenStorageService) { }

  ngOnInit(): void {

    let audio = new Audio();
    audio.src = "../../assets/Images/about-page/pikachusound.mp3";
    this.audio = audio;
    let token = this.tokenService.getToken();
    console.log(token);
    if(token){
      this.isLoggedIn = true;
    }else{
      this.isLoggedIn = false;
    }

  }
  playAudio() {
    this.audio.play();

  }
}
