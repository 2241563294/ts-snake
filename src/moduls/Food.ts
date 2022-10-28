// 定义食物类
class Food {
  // 元素
  element: HTMLElement;

  constructor() {
    // ! 表示不可能为空
    this.element = document.getElementById('food')!;
  }

  // 定义个获取食物x坐标的方法
  get X() {
    return this.element.offsetLeft;
  }

  get Y() {
    return this.element.offsetTop;
  }

  // 修改食物位置
  change() {
    // 随机生成位置
    // X: 0 - 290 
    // 移动一次就是一格, 10

    let left = Math.round(Math.random() * 29) * 10;
    let top = Math.round(Math.random() * 29) * 10;

    // 设置位置
    this.element.style.left = left + 'px';
    this.element.style.top = top + 'px';
  }
}

export default Food;