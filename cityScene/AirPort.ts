/**
 * 飞行站
 */
class AirPort extends egret.Bitmap {
    constructor() {
        super();
    }

    public update(texture) {
        this.texture = texture;
        console.log(this.texture);
    }
}