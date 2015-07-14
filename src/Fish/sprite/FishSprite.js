/**
 * Created by leo on 2015/7/13.
 */
var FishSprite = cc.Sprite.extend({
    _animation: null,
    state: 0,
    _fast: false,

    ctor: function () {
        this._super("#t0.png");   //设置这个，否则无法获取sprite宽高
        this._animation = new cc.Animation();
        for (var i = 0; i < 4; i++) {
            this._animation.addSpriteFrame(cc.spriteFrameCache.getSpriteFrame("t" + i + ".png"));
        }
        this._animation.setDelayPerUnit(1 / 6);
        var action = cc.animate(this._animation).repeatForever();
        this.runAction(action);
        this._fast = false;
        this._animation.retain();

        return true;
    }
});