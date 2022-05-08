import { Component, OnInit, Input } from '@angular/core';
import {FanArt} from '../fanArts'


@Component({
  selector: 'app-list-of-fan-arts',
  templateUrl: './list-of-fan-arts.component.html',
  styleUrls: ['./list-of-fan-arts.component.css']
})


export class ListOfFanArtsComponent implements OnInit {
  @Input() theme!: string;
  @Input() fanArts! : FanArt[]; 
  constructor() { }

  ngOnInit(): void {
  }

}
