"use strict";
exports.__esModule = true;
// 定义表示记分牌的类
var ScroePanel = /** @class */ (function () {
    function ScroePanel(maxLevel, upScore) {
        if (maxLevel === void 0) { maxLevel = 10; }
        if (upScore === void 0) { upScore = 10; }
        // 计数器
        this._score = 0;
        this._level = 1;
        this.scoreEle = document.getElementById('score');
        this.levelEle = document.getElementById('level');
        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }
    // 设置加分函数
    ScroePanel.prototype.addScore = function () {
        this.scoreEle.innerText = ++this._score + '';
        // 判断分数是多少
        if (this._score % this.upScore === 0) {
            this.levelUp();
        }
    };
    // 升级方法
    ScroePanel.prototype.levelUp = function () {
        if (this._level < this.maxLevel) {
            this.levelEle.innerText = ++this._level + '';
        }
    };
    Object.defineProperty(ScroePanel.prototype, "score", {
        // 相当于私有方法的别名函数
        // 类外调用使用
        get: function () {
            return this._score;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScroePanel.prototype, "level", {
        get: function () {
            return this._level;
        },
        enumerable: false,
        configurable: true
    });
    return ScroePanel;
}());
exports["default"] = ScroePanel;
