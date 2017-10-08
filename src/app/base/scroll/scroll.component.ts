import { Component, DoCheck, ElementRef, EventEmitter,
  ViewChild, Input, OnChanges, Output, OnInit, AfterViewInit, SimpleChanges } from '@angular/core';
import BScroll from 'better-scroll';
import { getRect } from '../../../common/js/dom';

@Component({
  selector: 'app-scroll',
  templateUrl: './scroll.component.html',
  styleUrls: ['./scroll.component.styl']
})
export class ScrollComponent implements OnInit, OnChanges, AfterViewInit, DoCheck {

  @Input() data: any;

  @Input() probeType: Number = 1;

  @Input() clickable: Boolean = true;

  @Input() scrollbar: Boolean = true;

  @Input() listenScroll: Boolean = false;

  @Input() pullDownRefresh: any = false;

  @Input() pullUpLoad: any = false;

  @Input() beforeScroll: Boolean = false;

  @Output() scrollPos: EventEmitter<any> = new EventEmitter;

  @Output() pullingUp: EventEmitter<any> = new EventEmitter;

  @Output() pullingDown: EventEmitter<any> = new EventEmitter;

  @ViewChild('wrapper') wrapper: ElementRef; // 获取dom
  @ViewChild('listWrapper') listWrapper: ElementRef;

  oldData: any;
  scroll: any;
  isPullUpLoad: Boolean = false;
  beforePullDown: Boolean = true;
  pulling: Boolean = false;
  isRebounding: Boolean = false;
  isPullingDown: Boolean = false;
  pullUpDirty: Boolean = true;
  pullDownInitTop: any;
  pullDownStyle: any = '';
  bubbleY: any = 0;

  _DEFAULT_MORE_TXT: String = '加载更多';
  _DEFAULT_NO_MORE_TXT: String = '没有更多了';
  _DEFAULT_REFRESH_TXT: String = '刷新成功';

  moreTxt: String;
  noMoreTxt: String;

  refreshTxt: String;

  constructor() {
  }

  _initScroll() {
    // 初始化BScroll
    if (!this.wrapper) {
      return;
    }

    // 当数据不足一页时默认scroll组件不会滚动，为了让上拉加载和下拉刷新能正常使用给ul加了min-height
    if (this.listWrapper && (this.pullDownRefresh || this.pullUpLoad)) {
      this.listWrapper.nativeElement.style.minHeight = `${getRect(this.wrapper.nativeElement).height + 2}px`;
    }

    const options: Object = {
      probeType: this.probeType,
      click: this.clickable,
      scrollY: true,
      // scrollX: true,
      pullDownRefresh: this.pullDownRefresh,
      pullUpLoad: this.pullUpLoad,
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
      // if (!this.pullUpDirty) {
      //   return;
      // }
      this.isPullUpLoad = true;
      this.pullingUp.emit();
    });
  }

  _initPullDownRefresh() {
    this.scroll.on('pullingDown', () => {
      this.beforePullDown = false;
      this.isPullingDown = true;
      this.pulling = true;
      this.pullingDown.emit();
    });

    this.scroll.on('scroll', (pos) => {
      if (this.beforePullDown) {
        this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop);
        this.pullDownStyle = `${Math.min(pos.y + this.pullDownInitTop, 10)}px`;
      } else {
        this.bubbleY = 0;
      }

      if (this.isRebounding) {
        this.pullDownStyle = `${10 - (this.pullDownRefresh.stop - pos.y)}px`;
      }
    });
  }

  _reboundPullDown() {
    const {stopTime = 600} = this.pullDownRefresh;
    return new Promise((resolve) => {
      setTimeout(() => {
        this.isRebounding = true;
        this.scroll.finishPullDown();
        this.isPullingDown = false;
        resolve();
      }, stopTime);
    });
  }

  _afterPullDown() {
    setTimeout(() => {
      this.pullDownStyle = `${this.pullDownInitTop}px`;
      this.beforePullDown = true;
      this.isRebounding = false;
      this.refresh();
    }, this.scroll.options.bounceTime);
  }

  enable () {
    this.scroll && this.scroll.enable();
  }

  disable () {
    this.scroll && this.scroll.disable();
  }

  refresh () { // 刷新scroll
    this.scroll && this.scroll.refresh();
  }

  scrollTo () { // 滚动到坐标
    this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
  }

  scrollToElement () { // 滚动到元素
    this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
  }

  destroy() { // 销毁
    this.scroll.destroy();
  }

  forceUpdate(dirty) {
    if (this.pullDownRefresh && this.isPullingDown) {
      this.pulling = false;
      this._reboundPullDown().then(() => {
        this._afterPullDown();
      });
    } else if (this.pullUpLoad && this.isPullUpLoad) {
      this.isPullUpLoad = false;
      this.scroll.finishPullUp();
      this.pullUpDirty = dirty;
      this.refresh();
    } else {
      this.refresh();
    }
  }

  ngOnInit() {
    this.pullDownInitTop = -50;

    this.moreTxt = this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.more || this._DEFAULT_MORE_TXT;

    this.noMoreTxt = this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.noMore || this._DEFAULT_NO_MORE_TXT;

    this.refreshTxt = this.pullDownRefresh && this.pullDownRefresh.txt || this._DEFAULT_REFRESH_TXT;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // 只执行了一次
    const data = changes['data'];
    // console.log(data);
  }

  ngAfterViewInit() {
    // 初始化完组件视图及其子视图之后调用。
    // BScroll加载必须放在此钩子中否则无法滚动
    setTimeout(() => {
      this._initScroll();
    }, 20);
  }

  /**
   * question 2
   * 如何检测data的更新从而更新scroll
   */
  ngDoCheck() {
    // console.log(this.data);
    if (this.data !== this.oldData) {
      // console.log(this.data);
      setTimeout(() => {
        this.forceUpdate(true);
      }, 30);
      this.oldData = this.data;
    }
  }
}
