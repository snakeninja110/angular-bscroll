import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.styl']
})
export class ItemComponent implements OnInit {
  public item: any;

  constructor(
    private router: Router,
    private routeInfo: ActivatedRoute
  ) { }

  ngOnInit() {
    const n = this.routeInfo.snapshot;
    console.log(n);
    this.item = n.queryParams['item'];
  }

  openCircle() {
    // this.router.navigate([{outlets: {aux: 'circle'}}]);
  }
}
