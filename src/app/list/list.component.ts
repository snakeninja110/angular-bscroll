import { Component, ElementRef, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';
import { ScrollComponent } from '../base/scroll/scroll.component';
import { ItemsService } from '../service/items.service';
import { getRect } from '../../common/js/dom';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.styl']
})
export class ListComponent implements OnInit, AfterViewInit {

  probeType: Number = 3;
  clickable: Boolean = true;
  pos: any;
  list: Array<any>;

  // infinite Scroll
  pullUpLoad: Boolean = true;
  pullUpLoadThreshold: Number = 0;
  pullUpLoadMoreTxt: String = '加载更多';
  pullUpLoadNoMoreTxt: String = '没有数据了';
  pullUpLoadObj: Object;

  // pullDown Refresh
  pullDownRefresh: Boolean = true;
  pullDownRefreshThreshold: Number = 90;
  pullDownRefreshStop: Number = 40;
  pullDownRefreshObj: Object;

  @ViewChild(ScrollComponent) scroll: ScrollComponent;
  @ViewChild('listView') listView: ElementRef;

  constructor(public items: ItemsService) {
    this.list = this.items.getItems();
  }

  ngOnInit() {
    this.pullDownRefreshObj = this.pullDownRefresh ? {
      threshold: this.pullDownRefreshThreshold,
      stop: this.pullDownRefreshStop
    } : false;

    this.pullUpLoadObj = this.pullUpLoad ? {
      threshold: this.pullUpLoadThreshold,
      txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
    } : false;
  }

  ngAfterViewInit() {
    // 当数据不足一页时默认scroll组件不会滚动，为了让上拉加载和下拉刷新能正常使用给ul加了min-height
    if (this.list && (this.pullDownRefresh || this.pullUpLoad)) {
      this.listView.nativeElement.style.minHeight = `${getRect(this.scroll.wrapper.nativeElement).height + 2}px`;
    }
  }

  hander(pos) {
    // console.log(pos);
  }

  onPullingUp() {
    console.log('pulling up and load data');
    setTimeout(() => {
      if (Math.random() > 0.5) {
        // 有新数据
        this.list.push(...this.items.getMoreItems());
        this.refresh();
      } else {
        this.scroll.forceUpdate(false);
      }
    }, 1000);
  }

  onPullingDown() {
    console.log('pulling down and Refresh');
    setTimeout(() => {
      if (Math.random() > 0.5) {
        // 如果有新数据
        this.list.unshift(`new message ${+new Date()}`);
        this.refresh();
      }
      this.scroll.forceUpdate(false);
    }, 1000);
  }

  clickItem(item, index) {
    console.log(`这是第${index}个：${item}`);
  }

  /**
   * 获取数据后scroll的刷新应该放在scroll组件内执行
   * */
  refresh() {
    setTimeout(() => {
      this.scroll.forceUpdate(true);
    }, 20);
  }
}
