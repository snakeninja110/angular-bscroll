import { Component, ElementRef, Input, OnInit, OnChanges, AfterViewInit, ViewChild, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-bubble',
  templateUrl: './bubble.component.html',
  styleUrls: ['./bubble.component.styl']
})
export class BubbleComponent implements OnInit, OnChanges, AfterViewInit {

  // BUG:在初次加载和刷新完一次之后(y为0)不会绘制图形，只有在y为正数时才会绘制

  @Input() y: any;

  style: any;
  width = 50;
  height = 80;
  ratio: any;
  initRadius: number;
  minHeadRadius: number;
  minTailRadius: number;
  initArrowRadius: number;
  minArrowRadius: number;
  arrowWidth: number;
  maxDistance: number;
  initCenterX: number;
  initCenterY: number;
  headCenter = {
    x: null,
    y: null
  };
  distance: any;

  @ViewChild('bubble') bubble: ElementRef;

  constructor() { }

  ngOnInit() {
    this.ratio = window.devicePixelRatio;
    this.width *= this.ratio;
    this.height *= this.ratio;
    this.initRadius = 18 * this.ratio;
    this.minHeadRadius = 12 * this.ratio;
    this.minTailRadius = 5 * this.ratio;
    this.initArrowRadius = 10 * this.ratio;
    this.minArrowRadius = 6 * this.ratio;
    this.arrowWidth = 3 * this.ratio;
    this.maxDistance = 40 * this.ratio;
    this.initCenterX = 25 * this.ratio;
    this.initCenterY = 25 * this.ratio;
    this.headCenter = {
      x: this.initCenterX,
      y: this.initCenterY
    };

    this.style = {
      width: `${this.width / this.ratio}px`,
      height: `${this.height / this.ratio}px`
    };
  }

  _draw() {
    const bubble = this.bubble.nativeElement;
    let ctx = bubble.getContext('2d');
    ctx.clearRect(0, 0, bubble.width, bubble.height);

    this._drawBubble(ctx);

    this._drawArrow(ctx);
  }

  _drawBubble(ctx) {
    ctx.save();
    ctx.beginPath();

    const rate = this.distance / this.maxDistance;
    const headRadius = this.initRadius - (this.initRadius - this.minHeadRadius) * rate;

    this.headCenter.y = this.initCenterY - (this.initRadius - this.minHeadRadius) * rate;

    // 画上半弧线
    ctx.arc(this.headCenter.x, this.headCenter.y, headRadius, 0, Math.PI, true);

    // 画左侧贝塞尔
    const tailRadius = this.initRadius - (this.initRadius - this.minTailRadius) * rate;
    const tailCenter = {
      x: this.headCenter.x,
      y: this.headCenter.y + this.distance
    };

    const tailPointL = {
      x: tailCenter.x - tailRadius,
      y: tailCenter.y
    };
    const controlPointL = {
      x: tailPointL.x,
      y: tailPointL.y - this.distance / 2
    };

    ctx.quadraticCurveTo(controlPointL.x, controlPointL.y, tailPointL.x, tailPointL.y);

    // 画下半弧线
    ctx.arc(tailCenter.x, tailCenter.y, tailRadius, Math.PI, 0, true);

    // 画右侧贝塞尔
    const headPointR = {
      x: this.headCenter.x + headRadius,
      y: this.headCenter.y
    };
    const controlPointR = {
      x: tailCenter.x + tailRadius,
      y: headPointR.y + this.distance / 2
    };
    ctx.quadraticCurveTo(controlPointR.x, controlPointR.y, headPointR.x, headPointR.y);

    ctx.fillStyle = 'rgb(170,170,170)';
    ctx.fill();
    ctx.strokeStyle = 'rgb(153,153,153)';
    ctx.stroke();
    ctx.restore();
  }

  _drawArrow(ctx) {
    ctx.save();
    ctx.beginPath();

    const rate = this.distance / this.maxDistance;
    const arrowRadius = this.initArrowRadius - (this.initArrowRadius - this.minArrowRadius) * rate;

    // 画内圆
    ctx.arc(this.headCenter.x, this.headCenter.y, arrowRadius - (this.arrowWidth - rate), -Math.PI / 2, 0, true);

    // 画外圆
    ctx.arc(this.headCenter.x, this.headCenter.y, arrowRadius, 0, Math.PI * 3 / 2, false);

    ctx.lineTo(this.headCenter.x, this.headCenter.y - arrowRadius - this.arrowWidth / 2 + rate);
    ctx.lineTo(this.headCenter.x + this.arrowWidth * 2 - rate * 2, this.headCenter.y - arrowRadius + this.arrowWidth / 2);

    ctx.lineTo(this.headCenter.x, this.headCenter.y - arrowRadius + this.arrowWidth * 3 / 2 - rate);

    ctx.fillStyle = 'rgb(255,255,255)';
    ctx.fill();
    ctx.strokeStyle = 'rgb(170,170,170)';
    ctx.stroke();
    ctx.restore();
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(this.y);
    this.distance = Math.max(0, Math.min(this.y * this.ratio, this.maxDistance));
    // console.log(this.distance);
    // console.log(changes['y']);
    let y = changes['y'];
    if (y.currentValue !== y.previousValue) {
      this._draw();
    }
  }

  ngAfterViewInit() {
    this._draw();
  }

}
