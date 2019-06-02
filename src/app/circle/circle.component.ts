import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.styl']
})
export class CircleComponent implements OnInit {

  constructor(
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
  }

  close() {
    this.router.navigate([{outlets: {aux: null}}]);
    this.location.back();
  }
}
