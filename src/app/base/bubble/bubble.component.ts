import { Component, Input, OnInit, OnChanges, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-bubble',
  templateUrl: './bubble.component.html',
  styleUrls: ['./bubble.component.styl']
})
export class BubbleComponent implements OnInit, OnChanges {

  @Input() y: any;

  style: any;
  width: any = 50;
  height: any = 80;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    // console.log(this.y);
  }

}
