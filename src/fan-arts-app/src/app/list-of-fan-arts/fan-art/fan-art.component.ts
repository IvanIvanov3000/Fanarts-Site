import { Component, OnInit, Input } from '@angular/core';

import { FanArt } from '../../fanArts'

@Component({
  selector: 'app-fan-art',
  templateUrl: './fan-art.component.html',
  styleUrls: ['./fan-art.component.css']
})
export class FanArtComponent implements OnInit {

  @Input() fanArt!: FanArt;
  @Input() theme!: string;
  
  constructor() { }

  ngOnInit(): void {}

}
