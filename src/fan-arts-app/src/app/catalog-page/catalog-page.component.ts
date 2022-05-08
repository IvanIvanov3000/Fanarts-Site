import { Component, OnInit } from '@angular/core';

import { example, FanArt } from '../fanArts';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.css']
})
export class CatalogPageComponent implements OnInit {

  theme = "blue";
  fanArts: FanArt[] = example;
  constructor() { }

  ngOnInit(): void {
  }

}
