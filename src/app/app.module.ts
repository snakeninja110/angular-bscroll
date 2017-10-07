import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ScrollComponent } from './base/scroll/scroll.component';
import { BubbleComponent } from './base/bubble/bubble.component';
import { ListComponent } from './list/list.component';
import { LoadingComponent } from './base/loading/loading.component';
import { ItemsService } from './service/items.service';

@NgModule({
  declarations: [
    AppComponent,
    ScrollComponent,
    BubbleComponent,
    ListComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ItemsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
