import Physical from './Physical';

export default class Platform extends Physical {
    constructor(texture, x, y, width, height) {
        super(x, y, width, height);
        this.x = x || 0;
        this.y = y || 0;
        this.texture = texture || 'orange';
    }

    render(ctx) {
        ctx.save();
        ctx.fillStyle = this.texture;
        ctx.fillRect(this.x, this.y, this.width, this.heigh);
        ctx.restore();
    }
} 