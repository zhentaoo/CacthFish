/**
 * Created by leo on 2015/7/13.
 */
var FishLayer = cc.Layer.extend({
    size: null,
    tag: 1,
    fish: null,
    bullet: null,
    bgSprite: null,
    rudder: null,
    that: null,
    bulletNum: 15,
    fishes: [],

    ctor: function () {
        this._super();

        this.that = this;
        this.size = cc.winSize;

        cc.spriteFrameCache.addSpriteFrames(res.fish1_plist, res.fish1);

        /*添加背景*/
        this.addBG();

        /*添加发射台*/
        this.addRudder();

        /*定时添加小鱼,鱼有单独的精灵类*/
        this.schedule(this.addFish, 2, cc.REPEAT_FOREVER, 0, '11');

        /*创建子弹*/
        cc.spriteFrameCache.addSpriteFrames(res.bullet);
        this.bullet = new cc.Sprite(res.bullet);
        this.bullet.attr({
            x: 1000,
            y: 1000
        });

        /*添加子弹发射事件*/
        this.addTouchEventListener(this.that);

        /*每帧刷新判断是否有小球和小鱼相撞*/
        this.scheduleUpdate();
        return true;
    },

    addBG: function () {
        this.bgSprite = new cc.Sprite(res.BG);
        this.bgSprite.attr({
            x: this.size.width / 2,
            y: this.size.height / 2,
            rotation: 180
        });
        this.addChild(this.bgSprite, 0);
    },

    addRudder: function () {
        this.rudder = new cc.Sprite(res.rudder);
        this.rudder.attr({
            x: this.size.width / 2,
            y: 35
        });
        this.addChild(this.rudder);
    },

    addFish: function () {
        var fish = new FishSprite();
        fish.attr({
            x: -50,
            y: Math.random() * 450
        });
        this.addChild(fish, 1);

        var startX = -30;
        var startY = Math.random() * 450;
        var thenX = cc.winSize.width / 2;
        var thenY = 220;
        var endX = cc.winSize.width;
        var endY = Math.random() * 450;
        var bezier = [cc.p(startX, startY), cc.p(thenX, thenY), cc.p(endX, endY)];
        //var action = cc.MoveTo.create(4, cc.p(fish.x + cc.winSize.width, fish.y));
        fish.runAction(cc.bezierTo(4, bezier));

        this.fishes.push(fish);
        cc.log(this.fishes);
    },

    /*每帧动画更新时，获取鱼的位置信息，和子弹碰撞做处理*/
    update: function (dt) {
        /*鱼到边缘后消失*/
        var length = this.fishes.length;
        for (var i = 0; i < length; i++) {
            var fishX = this.fishes[i].x;
            if (fishX > cc.winSize.width - 5) {
                this.removeChild(this.fishes[i]);
                this.fishes.splice(i, 1);
                break;
            }
        }

        /*球撞到鱼后消失*/
        var bulletX = this.bullet.x;
        var bulletY = this.bullet.y;

        length = this.fishes.length;
        for (i = 0; i < length; i++) {
            var Xsub = parseInt(bulletX) - parseInt(this.fishes[i].x);
            var Ysub = parseInt(bulletY) - parseInt(this.fishes[i].y);
            if (Xsub < 0) {
                Xsub = -Xsub;
            }
            if (Ysub < 0) {
                Ysub = -Ysub;
            }
            if (Xsub < 25 && Ysub < 25) {
                cc.log("fishx:" + this.fishes[i].x);
                cc.log("fishy:" + this.fishes[i].y);

                cc.log("bulletX:" + bulletX);
                cc.log("bulletY:" + bulletY);

                this.removeChild(this.bullet);
                this.removeChild(this.fishes[i]);
                this.bullet.x = 1000;
                this.bullet.y = 1000;
                this.fishes.splice(i, 1);
                break;
            }

        }
    },

    /*给层添加鼠标事件*/
    addTouchEventListener: function (that) {
        this.touchListener = cc.EventListener.create({
            event: cc.EventListener.MOUSE,
            onMouseUp: function (event) {
                that.removeChild(that.bullet);

                var x = event.getLocation().x;
                var y = event.getLocation().y;
                that.addChild(that.bullet);
                that.bullet.attr({
                    x: cc.winSize.width / 2,
                    y: 35
                });

                var action = cc.MoveTo.create(1, cc.p(x, y));
                //cc.sequence.create(action,cc.removeSelf);
                that.bullet.runAction(action);

            }
        });
        cc.eventManager.addListener(this.touchListener, this);
    }
});


var FishScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new FishLayer();
        this.addChild(layer);
    }
});