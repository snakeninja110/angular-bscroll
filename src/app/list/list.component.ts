import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.styl']
})
export class ListComponent implements OnInit {

  probeType: Number = 3;
  clickable: Boolean = true;
  pos: any;

  list: Array<any> = [
    'this is line 1',
    'this is line 2',
    'this is line 3',
    'this is line 4',
    'this is line 5',
    'this is line 6',
    'this is line 7',
    'this is line 8',
    'this is line 9',
    'this is line 10',
    'this is line 11',
    'this is line 12',
    'this is line 13',
    'this is line 14',
    'this is line 15',
    'this is line 16',
    'this is line 17',
    'this is line 18',
    'this is line 19',
    'this is line 20'
  ];

  constructor() { }

  ngOnInit() {
  }

  hander(pos) {
    // console.log(pos);
  }

  pullingUp() {

  }
}
