import { Component, ElementRef, EventEmitter, ViewChild, Input, Output, OnInit, AfterViewInit } from '@angular/core';
import BScroll from 'better-scroll';
import { getRect } from '../../../common/js/dom';

@Component({
  selector: 'app-scroll',
  templateUrl: './scroll.component.html',
  styleUrls: ['./scroll.component.styl']
})
export class ScrollComponent implements OnInit, AfterViewInit {

  @Input() pullUpTxt: String = '加载更多';

  @Input() probeType: Number = 1;

  @Input() clickable: Boolean = true;

  @Input() scrollbar: Boolean = true;

  @Input() listenScroll: Boolean = false;

  @Input() pullDownRefresh: any = false;

  @Input() pullUpLoad: any = false;

  @Input() beforeScroll: Boolean = false;

  @Output() scrollPos: EventEmitter<any> = new EventEmitter;

  @Output() pullingUp: EventEmitter<any> = new EventEmitter;

  @ViewChild('wrapper') wrapper: ElementRef; // 获取dom
  @ViewChild('list') list: ElementRef;

  scroll: any;
  isPullUpLoad: Boolean = false;
  beforePullDown: Boolean = true;
  pulling: Boolean = false;

  constructor() { }

  _initScroll() {
    // 初始化BScroll
    if (!this.wrapper) {
      return;
    }

    if (this.list && (this.pullDownRefresh || this.pullUpLoad)) {
      this.list.nativeElement.styles.minHeight = `${getRect(this.wrapper).height}px`;
    }

    const options: Object = {
      probeType: this.probeType,
      click: this.clickable,
      scrollY: true,
      // scrollX: true,
      // pullDownRefresh: this.pullDownRefresh,
      // pullUpLoad: this.pullUpLoad,
      scrollbar: this.scrollbar
    };

    console.log(options);

    this.scroll = new BScroll(this.wrapper.nativeElement, options);

    if (this.listenScroll) {
      this.scroll.on('scroll', (pos) => {
        this.scrollPos.emit(pos);
      });
    }

    if (this.pullUpLoad) {
      this._initPullUpLoad();
    }

    if (this.pullDownRefresh) {
      this._initPullDownRefresh();
    }

    if (this.beforeScroll) {
      this.scroll.on('beforeScrollStart', () => {
        // this.$emit('beforeScroll');
      });
    }
  }

  _initPullUpLoad() {
    this.scroll.on('pullingUp', () => {
      this.isPullUpLoad = true;
      this.pullingUp.emit();
    });
  }

  _initPullDownRefresh() {

  }

  enable () {
    if (this.scroll) {
      this.scroll.enable();
    }
  }

  disable () {
    if (this.scroll) {
      this.scroll.disable();
    }
  }

  refresh () {
    if (this.scroll) {
      this.scroll.refresh();
    }
  }

  scrollTo () {
    if (this.scroll) {
      this.scroll.scrollTo.apply(this.scroll, arguments);
    }
  }

  scrollToElement () {
    if (this.scroll) {
      this.scroll.scrollToElement.apply(this.scroll, arguments);
    }
  }

  ngOnInit() {
    console.log(this.wrapper.nativeElement);
  }

  ngAfterViewInit() {
    // 初始化完组件视图及其子视图之后调用。
    // BScroll加载必须放在此钩子中否则无法滚动
    this._initScroll();
    console.log(this.scroll);
  }

  // getRect(el) {
  //   if (el instanceof (<any>window).SVGElement) {
  //     const rect: any = el.getBoundingClientRect();
  //     return {
  //       top: rect.top,
  //       left: rect.left,
  //       width: rect.width,
  //       height: rect.height
  //     };
  //   } else {
  //     return {
  //       top: el.offsetTop,
  //       left: el.offsetLeft,
  //       width: el.offsetWidth,
  //       height: el.offsetHeight
  //     };
  //   }
  // }
}
