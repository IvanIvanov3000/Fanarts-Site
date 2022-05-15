import { Component, OnInit } from '@angular/core';

import { example, FanArt } from '../fanArts';

@Component({
  selector: 'app-my-posts-page',
  templateUrl: './my-posts-page.component.html',
  styleUrls: ['./my-posts-page.component.css']
})
export class MyPostsPageComponent implements OnInit {


  theme = "orange"
  fanArts: FanArt[] = example
  constructor() { }

  ngOnInit(): void {
  }

}
