// 定义表示记分牌的类
class ScroePanel {

  // 可维护变量
  maxLevel: number;
  upScore: number;

  // 计数器
  private _score = 0;
  private _level = 1;

  // 页面元素
  private scoreEle: HTMLElement;
  private levelEle: HTMLElement;

  constructor(maxLevel: number = 10, upScore:number = 10) {
    this.scoreEle = document.getElementById('score')!;
    this.levelEle = document.getElementById('level')!;
    this.maxLevel = maxLevel;
    this.upScore = upScore;
  }

  // 设置加分函数
  addScore() {
    this.scoreEle.innerText = ++this._score + '';
    // 判断分数是多少
    if (this._score % this.upScore === 0) {
        this.levelUp();
    }
  }
  // 升级方法
  levelUp() {
    if (this._level < this.maxLevel) {
      this.levelEle.innerText = ++this._level + '';
    } 
  }

  // 相当于私有方法的别名函数
  // 类外调用使用
  get score() {
    return this._score;
  }

  get level() {
    return this._level;
  }
}

export default ScroePanel;