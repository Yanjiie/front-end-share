import { Component } from '@angular/core';

interface Data {
  name;
  sex;
  age;
  desc;
}

@Component({
  selector: 'app-root',
  template: `
  <div id="gn"> 
    <table>
        <tr *ngFor="let x of data">
            <td>{{x.name}}</td>
            <td>{{x.sex}}</td>
            <td>{{x.age}}</td>
            <td>{{x.desc}}</td>
        </tr>
    </table>
  </div>
  `,
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  data: Array<Data> = [];

  now: number;

  index = 0

  array = []

  timer;

  genData(n: number) {
    var data: Array<Data> = [];
    for (var i = 0; i < n; i++) {
      data.push({
            name: Math.random(),
            age: 3 + Math.ceil((Math.random() * 30)),
            sex: [(Math.random() > 0.5 ? '男' : '女')],
            desc: Math.random()
        })
    }
      return data
  }

  getKeys(item){
    return Object.keys(item);
  }

  constructor() {
    this.now = new Date().getTime()
    this.data = this.genData(1000)
  }

  ngAfterViewInit() {
    var cost = new Date().getTime() - this.now
    console.log('total ' + (cost) + ' ms')
    this.timer = setInterval(() => {
      this.now = new Date().getTime()
      this.data = this.genData(1000)
    }, 200)
  }

  ngAfterViewChecked() {
    var cost = new Date().getTime() - this.now
    console.log(this.index, " cost ", cost, 'ms')
    this.array.push(cost)
    this.now = new Date().getTime()
    this.index ++
    if (this.array.length > 60) {
        clearInterval(this.timer)
        console.log('平均耗时 ', this.array.reduce(function (a, b) {
            return a + b
        }, 0) / 60, 'ms')
        this.array.shift()
          console.log('更新平均耗时 ', this.array.reduce(function (a, b) {
            return a + b
        }, 0) / 60, 'ms')
    }
  }

}
