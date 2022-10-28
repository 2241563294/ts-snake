class Snake {
  // 表示蛇头的元素
  headEle: HTMLElement;
  // 蛇的身体（包括头）body
  bodies: HTMLCollection;
  // 蛇的全身
  element: HTMLElement;

  constructor() {
    this.headEle = document.querySelector('#snake>div')!;
    this.element = document.getElementById('snake')!;
    this.bodies = this.element.getElementsByTagName('div');
  }

  // 获取蛇的坐标
  get X() {
    return this.headEle.offsetLeft;
  }

  get Y() {
    return this.headEle.offsetTop;
  }

  
  // 设置蛇头坐标
  set X(value: number) {
    /**
     *  1.如果值没有变则没有必要修改
     *  2.如果值是相反方向的则修改回来，防止身体重叠
     *  3.否则移动身体
     *  4.判断是否撞墙
     *  5.给头赋值
     */
    if (value === this.X) return ;
    // 逻辑是 头之外的第一节和值相等了，说明重叠了,抵消掉前面game的操作
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) value = value > this.X ? this.X - 10 : this.X + 10 ;
    // 移动身体
    this.moveBody();
    // 蛇是否撞墙
    this.isError(value);
    this.headEle.style.left = value + 'px';

    // 蛇头变化后是否撞到身体
    this.cheHeadBody();
   
  }

  set Y(value: number) {
    if (value === this.Y) return ;
    // 逻辑是 头之外的第一节和值相等了，说明重叠了
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) value = value > this.Y ? this.Y - 10 : this.Y + 10 ;
    // 移动身体
    this.moveBody();
    this.isError(value);
    
    this.headEle.style.top = value + 'px';
    this.cheHeadBody();
  }

  // 设置蛇增加身体的方法
  addBody() {
    // 给element 添加div
    this.element.insertAdjacentHTML('beforeend', `<div></div>`);
  }

  // isError
  isError(value: number) {
    if(value < 0 || value > 290) {
      throw new Error("蛇撞墙了!GAME OVER!");
    }
  }

  // 移动蛇的身体方法
  moveBody() {
    // 从后往前改，但蛇头除外
    for (let i = this.bodies.length - 1; i > 0; i--){
      // 拿到前一个元素的位置
      let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;

      (this.bodies[i] as HTMLElement).style.left = X + 'px';
      (this.bodies[i] as HTMLElement).style.top = Y + 'px';
    }
  }

  // 蛇的身体和头是否重叠
  // 等蛇头的位置变化后才能判断
  cheHeadBody() {
    // 获取所有的身体，检查是否和蛇头的坐标发生重叠
    for (let i = 1; i < this.bodies.length; i++){
      // 蛇头以外的元素的位置
      let X = (this.bodies[i] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i] as HTMLElement).offsetTop;

      // 身体的每一节和头是否重叠
     if ( X === this.X && Y === this.Y) {
      throw new Error("咬到自己啦!GAME OVER!");
     }
    }
  }
}

export default Snake;