"use strict";
exports.__esModule = true;
var Food_1 = require("./Food");
var scroePanel_1 = require("./scroePanel");
var Snake_1 = require("./Snake");
// 游戏控制器
var GameControl = /** @class */ (function () {
    function GameControl() {
        // 可维护变量
        // 蛇的步长
        this.speed = 10;
        this.timer = setInterval(function () { }, 0);
        // 开始停止
        this.isGo = false;
        // 创建一个监听蛇的生死
        this.isLive = true;
        // 蛇的移动方向
        this.fx = 'ArrowRight';
        this.snake = new Snake_1["default"]();
        this.food = new Food_1["default"]();
        this.scorePanel = new scroePanel_1["default"](10, 5);
        // 初始化
        this.init();
    }
    // 游戏的初始化方法
    GameControl.prototype.init = function () {
        // 绑定键盘事件, 使用bind修改this指向
        document.addEventListener('keydown', this.keydownHandler.bind(this));
    };
    // 创建按下响应函数
    /**
     * ArrowUp
     * ArrowDown
     * ArrowLeft
     * ArrowRight
     */
    GameControl.prototype.keydownHandler = function (event) {
        // 按键检查
        // console.log(event.key);
        if (event.key === ' ')
            return;
        // 是否按p
        if (event.key === 'p') {
            this.isGo === false ? this.move() : clearTimeout(this.timer);
            this.isGo = !this.isGo;
        }
        else if (event.key === 'ArrowUp' || 'Up'
            || 'ArrowDown' || 'Down'
            || 'ArrowLeft' || 'Left'
            || 'ArrowRight' || 'Right') {
            this.fx = event.key;
        }
    };
    // 蛇移动的方法
    GameControl.prototype.move = function () {
        /**
         * 根据方向改变位置
         */
        var X = this.snake.X;
        var Y = this.snake.Y;
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
        }
        catch (e) {
            alert(e.message);
            this.isLive = false;
            clearInterval(this.timer);
        }
        clearInterval(this.timer);
        // 如果值蛇活着移动，否则死
        if (!this.isLive)
            return;
        this.timer = setInterval(this.move.bind(this), 300 - ((this.scorePanel.level - 1) * 30));
    };
    // 蛇是否吃到食物
    GameControl.prototype.cheEat = function (X, Y) {
        if (X === this.food.X && Y === this.food.Y) {
            console.log('吃到食物了！');
            // 位置重置
            this.food.change();
            // 分数增加
            this.scorePanel.addScore();
            // 长度增加
            this.snake.addBody();
        }
    };
    return GameControl;
}());
exports["default"] = GameControl;
