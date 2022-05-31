import { Component, OnInit } from '@angular/core';

import { FanArt } from '../fanArts';
import { FanArtsService } from '../_services/fan-arts.service';


@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.css']
})
export class CatalogPageComponent implements OnInit {

  theme = "blue";
  fanArts!: FanArt[]
  constructor(private fanArtsService: FanArtsService) { }


   ngOnInit(): void {
    this.fanArtsService.getAllFanArts().subscribe(
      data => {
        this.fanArts = data;
      },
      err => {
        console.log(err);
      }
    );
  }

}
