@@ -0,0 +1,16 @@
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-hero',
  templateUrl: './home-hero.component.html',
  styleUrls: ['./home-hero.component.css']
})
export class HomeHeroComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
