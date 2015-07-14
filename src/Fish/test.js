/**
 * Created by leo on 2015/7/13.
 */
var TestLayer = cc.Layer.extend({
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

        cc.log(this.size.width);
        cc.log(this.size.height);

        cc.spriteFrameCache.addSpriteFrames(res.fish1_plist, res.fish1);

        /*��ӱ���*/
        this.addBG();

        /*�����:���е����ľ�����,��ʱ���С��*/
        this.fish = new cc.Sprite("#t0.png");
        this.fish.attr({
            x: 200,
            y: 200
        });
        this.addChild(this.fish);

        /*�����ӵ�*/
        this.bullet = new cc.Sprite(res.bullet);
        this.fish.attr({
            x: 100,
            y: 100
        });
        this.addChild(this.bullet);
        var action = cc.MoveTo.create(1, cc.p(100, 100));
        this.bullet.runAction(action);

        /*����ӵ������¼�*/
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


    /*ÿ֡��������ʱ����ȡ���λ����Ϣ�����ӵ���ײ������*/
    update: function (dt) {
        var bulletX = this.bullet.x;
        var bulletY = this.bullet.y;
        cc.log("bx" + bulletX);
        cc.log("by" + bulletY);

        cc.log("fishx" + this.fish.x);
        cc.log("fishy" + this.fish.y);

        if (this.fish.x == bulletX && this.fish.y == bulletY) {
            this.fish.removeFromParent();
            this.fish.x = 500;
            this.fish.y = 500;
        }
    }
});


var TestScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new TestLayer();
        this.addChild(layer);
    }
});