"use strict";
exports.__esModule = true;
// 定义食物类
var Food = /** @class */ (function () {
    function Food() {
        // ! 表示不可能为空
        this.element = document.getElementById('food');
    }
    Object.defineProperty(Food.prototype, "X", {
        // 定义个获取食物x坐标的方法
        get: function () {
            return this.element.offsetLeft;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Food.prototype, "Y", {
        get: function () {
            return this.element.offsetTop;
        },
        enumerable: false,
        configurable: true
    });
    // 修改食物位置
    Food.prototype.change = function () {
        // 随机生成位置
        // X: 0 - 290 
        // 移动一次就是一格, 10
        var left = Math.round(Math.random() * 29) * 10;
        var top = Math.round(Math.random() * 29) * 10;
        // 设置位置
        this.element.style.left = left + 'px';
        this.element.style.top = top + 'px';
    };
    return Food;
}());
exports["default"] = Food;
