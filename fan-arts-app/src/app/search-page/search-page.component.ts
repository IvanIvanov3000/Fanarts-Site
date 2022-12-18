import { Component, OnInit } from '@angular/core';

import { FanArt } from '../fanArts';
import { FanArtsService } from '../_services/fan-arts.service';


@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  theme = "blue"
  fanArts!: FanArt[];
  areThereFanArts!: boolean;

  form: any = {
    title: null,
    tag: null,
  };

  constructor(private fanArtsService: FanArtsService) { }

  ngOnInit(): void {
  }
  onSubmit(): void {
    const { title, tag } = this.form;
    console.log(title, tag);
    this.fanArtsService.searchFanArt(title, tag)
      .subscribe(
        data => {
          console.log(data);
          this.fanArts = data;
          if (data.length > 0) {
            this.areThereFanArts = true;

          } else {
            this.areThereFanArts = false;
          }
        },
        err => {
          console.log(err);
        }
      );
  }


} 
