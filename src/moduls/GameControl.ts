import Food from './Food';
import ScroePanel from './scroePanel';
import Snake from './Snake';

// 游戏控制器
class GameControl {
  // 可维护变量
  // 蛇的步长
  speed = 10;
  timer = setInterval(()=>{},0);
  // 开始停止
  isGo = false;
  // 创建一个监听蛇的生死
  isLive = true;
  // 蛇
  snake: Snake;
  // 食物
  food: Food;
  // 计分牌
  scorePanel: ScroePanel;
  // 蛇的移动方向
  fx: string = 'ArrowRight';
  
  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScroePanel(10, 5);
    // 初始化
    this.init();
  }

  // 游戏的初始化方法
  init() {
    // 绑定键盘事件, 使用bind修改this指向
    document.addEventListener('keydown', this.keydownHandler.bind(this));
  }

  // 创建按下响应函数
  /**
   * ArrowUp
   * ArrowDown
   * ArrowLeft
   * ArrowRight
   */
  keydownHandler(event: KeyboardEvent) {
    // 按键检查
    // console.log(event.key);
    if (event.key === ' ') return;
    // 是否按p
    if (event.key === 'p') {
      this.isGo === false ? this.move() : clearTimeout(this.timer);
      this.isGo = !this.isGo;
    } else if (event.key === 'ArrowUp' || 'Up' 
      || 'ArrowDown' || 'Down' 
      || 'ArrowLeft' || 'Left' 
      || 'ArrowRight' || 'Right' ){
      this.fx = event.key; 
    } 
  }

  // 蛇移动的方法
  move() {
    /**
     * 根据方向改变位置
     */
    let X = this.snake.X;
    let Y = this.snake.Y;
    switch (this.fx) {
      case 'ArrowUp':
      case 'Up':
        Y -= this.speed;
        break;
      case 'ArrowDown':
      case 'Down':
        Y += this.speed;
        break;
      case 'ArrowLeft':
      case 'Left':
        X -= this.speed;
        break;
      case 'ArrowRight':
      case 'Right':
        X += this.speed;
        break;
    }

    // 检查蛇是否吃到了食物
    this.cheEat(X, Y);
    // 应用到蛇上
    try {
      // 移动蛇头
      this.snake.X = X;
      this.snake.Y = Y;
    } catch(e) {
      alert(e.message);
      this.isLive = false;
      clearInterval(this.timer);
    }
    clearInterval(this.timer);
    // 如果值蛇活着移动，否则死
    if (!this.isLive) return; 
    this.timer = setInterval(this.move.bind(this), 300 - ((this.scorePanel.level - 1 ) * 30));
  }

  // 蛇是否吃到食物
  cheEat(X:number, Y:number) {
    if (X === this.food.X && Y === this.food.Y) {
      console.log('吃到食物了！');
      // 位置重置
      this.food.change();
      // 分数增加
      this.scorePanel.addScore();
      // 长度增加
      this.snake.addBody();
    }
  }
}

export default GameControl;