import { Component, OnInit } from '@angular/core';

import { example, FanArt } from '../fanArts';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  theme = "yellow"
  fanArts: FanArt[] = example
  constructor() { }

  ngOnInit(): void {
  }

}
