/**
 * Created by leo on 2015/7/14.
 */
var BulletSprite = cc.Sprite.extend({
    touchListener: null,

    ctor: function () {
        this._super(res.bullet);
        //this.addTouchEventListener();

    }
});