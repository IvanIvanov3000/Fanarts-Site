import { Component, OnInit } from '@angular/core';

import { FanArt } from '../fanArts';
import { FanArtsService } from '../_services/fan-arts.service';


@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.css']
})
export class CatalogPageComponent implements OnInit {

  areThereFanArts! : boolean;
  theme = "blue";
  fanArts!: FanArt[]
  constructor(private fanArtsService: FanArtsService) { }


   ngOnInit(): void {
    this.fanArtsService.getAllFanArts().subscribe(
      data => {
        data.sort((a: any, b : any) => a.likes.length - b.likes.length);
        data.reverse();
        this.fanArts = data;
        if(data.length > 0) {
          this.areThereFanArts = true;
        }else{
          this.areThereFanArts = false;
          
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}
