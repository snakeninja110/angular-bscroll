# AngularBscroll

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.3.

做了vue项目后想着把better-scroll配合别的框架试试所以就写了这个demo，中间踩坑无数

### ！Angular里没有watch和computed
    这是最蛋疼的地方，为了监听data和属性的变化我各种钩子都试了一遍

*   ngOnChanges无法监听Object的变化，ngDoCheck在多数情况都会触发而且写的判断有莫名其妙的BUG，ngAfterContentChecked在dom滚动的时候也会触发所以无法用它来监听dom的增加。
*   最后是用了ContentChild来获取父组件往scroll组件中插入的dom，根据dom的children.length的变化来触发滚动条的刷新

### 用依赖注入来模拟真实的数据获取
具体在items.service.ts里

***

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
# angular-bscroll
