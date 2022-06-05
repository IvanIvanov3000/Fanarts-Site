@@ -0,0 +1,34 @@
import { Component, OnInit } from '@angular/core';

import { FanArt } from '../fanArts';
import { FanArtsService } from '../_services/fan-arts.service';
@Component({
  selector: 'app-my-posts-page',
  templateUrl: './my-posts-page.component.html',
  styleUrls: ['./my-posts-page.component.css']
})
export class MyPostsPageComponent implements OnInit {

  areThereFanArts: boolean = false;
  theme = "orange"
  fanArts!: FanArt[];
  constructor(private fanArtsService: FanArtsService) { }

  ngOnInit(): void {
    this.fanArtsService.getMyFanArts().subscribe(
      data => {
        this.fanArts = data;
        if (data.length > 0) {
          this.areThereFanArts = true;
        } else {
          this.areThereFanArts = false;
        }
        console.log(this.areThereFanArts);
      },
      err => {
        console.log(err);
      }
    );
  }

}
