import { Component, OnInit } from '@angular/core';

import { example, FanArt } from '../fanArts';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  theme = "blue"
  fanArts!: FanArt[];
  constructor() { }

  ngOnInit(): void {
  }

}
