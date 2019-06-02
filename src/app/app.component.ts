import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnDestroy {
  title = 'app';

  constructor(private router: Router) {}

  ngOnDestroy() {
    this.router.navigate([{outlet: {aux: null}}]);
  }
}
