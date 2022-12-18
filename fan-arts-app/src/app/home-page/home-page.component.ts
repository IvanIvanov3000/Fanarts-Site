import { Component, OnInit } from '@angular/core';

import { FanArt } from '../fanArts';
import { FanArtsService } from '../_services/fan-arts.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  errorMessage = "";
  theme = "yellow"
  fanArts!: FanArt[];
  constructor(private fanArtsService: FanArtsService) { }

  ngOnInit(): void {
    this.fanArtsService.getLatestFanArts().subscribe(
      data => {
        console.log(data);
        this.fanArts = data;
        this.fanArts = this.fanArts.sort((a, b) => a.likes.length - b.likes.length);
        this.fanArts.reverse();
        this.fanArts =  this.fanArts.splice(0, 4);

      },
      err => {
        console.log(err);

        this.errorMessage = err.error.message;
      }
    );
  }

}
