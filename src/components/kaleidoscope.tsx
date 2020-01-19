/* tslint:disable:max-classes-per-file */
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { getRandomInt, rotate } from '../utils/math';

interface Props {
  colors: string[];
  corner: number;
  height: number;
  maxSize: number;
  minSize: number;
  quantity: number;
  width: number;
}

interface State {
  centerX: number;
  centerY: number;
  rad: number;
}

const style = {
  backgroundColor: 'white',
  border: '1px solid gray',
};

class Particle {
  private ctx: CanvasRenderingContext2D;
  private shape: string;
  private size: number;
  private color: string;
  private opacity: number;
  private x: number;
  private y: number;
  private inclX: number;
  private inclY: number;
  private v: number;
  private rad: number;

  constructor(props) {
    const shapes = ['square', 'circle', 'wave'];

    this.ctx = props.ctx;
    this.shape = shapes[getRandomInt(shapes.length)];
    this.size = getRandomInt(props.maxSize - props.minSize) + props.minSize;
    this.color = props.color;
    this.opacity = 0;
    this.x = props.x;
    this.y = props.y;
    this.inclX = props.inclX;
    this.inclY = props.inclY;
    this.v = getRandomInt(3) * 0.1 + 0.2; // 0.3〜0.6
    this.rad = (2 * Math.PI) / (getRandomInt(6) + 1);
  }

  public getPos() {
    return { x: this.x, y: this.y };
  }

  public getSize() {
    switch (this.shape) {
      case 'square':
        return Math.sqrt(this.size ** 2 + this.size ** 2);
      case 'wave':
        return Math.sqrt(
          (this.size + this.size * 0.3) ** 2 +
            (this.size * 0.4 + this.size * 0.3) ** 2
        );
      case 'circle':
      default:
        return this.size;
    }
  }

  public setIncl(inclX, inclY) {
    this.inclX = inclX;
    this.inclY = inclY;
  }

  public draw() {
    const ctx = this.ctx;
    switch (this.shape) {
      case 'square':
        ctx.save();

        // 設定
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;

        // 回転
        ctx.translate(this.x + this.size / 2, this.y + this.size / 2);
        ctx.rotate(this.rad);
        ctx.translate(-(this.x + this.size / 2), -(this.y + this.size / 2));

        // 描画
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.size, this.size);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
        break;
      case 'wave':
        ctx.save();

        // 設定
        ctx.strokeStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.lineWidth = this.size * 0.3;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';

        // 回転
        ctx.translate(this.x + this.size * 0.5, this.y + this.size * 0.2);
        ctx.rotate(this.rad);
        ctx.translate(-(this.x + this.size * 0.5), -(this.y + this.size * 0.2));

        // 描画
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.size * 0.2, this.y + this.size * 0.4);
        ctx.lineTo(this.x + this.size * 0.4, this.y);
        ctx.lineTo(this.x + this.size * 0.6, this.y + this.size * 0.4);
        ctx.lineTo(this.x + this.size * 0.8, this.y);
        ctx.lineTo(this.x + this.size, this.y + this.size * 0.4);
        ctx.stroke();

        ctx.restore();
        break;
      case 'circle':
      default:
        ctx.save();

        // 設定
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;

        // 描画
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size / 2, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
        break;
    }
  }

  public drawAtRotatedPosition(centerX: number, centerY: number, rad: number) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(rad);
    ctx.translate(-centerX, -centerY);
    this.draw();
    ctx.restore();
  }

  public update() {
    // 出現時、ふわっと出す
    if (this.opacity < 1) {
      this.opacity += 0.1;
    }

    // 位置更新
    if (!(this.inclX || this.inclY)) {
      this.y += this.v;
    } else {
      this.x += this.v * this.inclX;
      this.y += this.v * this.inclY;
    }
    this.rad += this.v * 0.001 * 2 * Math.PI;
  }
}

class Kaleidoscope extends Component<Props, State> {
  public static propTypes;
  public static defaultProps;
  private canvas: React.RefObject<HTMLCanvasElement>;
  private animationID: number;
  private particles: Particle[] = [];

  private inclX;
  private inclY;

  // パーティクルの本体は以下の範囲内にある
  // if isSharp
  //  y < inclA * x               原点と中心を通る直線
  //  y < inclB * x + interceptB  中心と原点を回転させた点を通る直線
  //  y > inclC * x               原点と原点を回転させた点を通る直線
  // else
  //  y < inclA * x               原点と中心を通る直線
  //  y > inclB * x + interceptB  中心と原点を回転させた点を通る直線
  //  y > inclC * x               原点と原点を回転させた点を通る直線
  private isSharp: boolean;
  private inclA: number;
  private inclB: number;
  private interceptB: number;
  private inclC: number;

  constructor(props) {
    super(props);

    const centerX = props.width / 2;
    const centerY = props.height / 2;
    const rad = (2 * Math.PI) / props.corner;
    const p = rotate(0, 0, centerX, centerY, rad);

    this.state = {
      centerX,
      centerY,
      rad,
    };

    // キャンバス関係
    this.canvas = React.createRef();
    this.animationID = null;

    // パーティクルの存在範囲
    this.isSharp = p.x < centerX;
    this.inclA = centerY / centerX;
    this.inclB = (p.y - centerY) / (p.x - centerX);
    this.interceptB = centerY - this.inclB * centerX;
    this.inclC = p.y / p.x;
  }

  public componentDidMount() {
    _.times(this.props.quantity, () => {
      this.initParticle();
    });
    this.initCanvas();
  }

  public componentDidUpdate() {
    // 更新
  }

  public componentWillUnmount() {
    // 終了
  }

  public render() {
    return (
      <canvas
        ref={this.canvas}
        width={this.props.width}
        height={this.props.height}
        onMouseMove={e =>
          this.onMouseMove(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
        }
        style={style}
      />
    );
  }

  private onMouseMove(x, y) {
    const unit = Math.sqrt(
      (x - this.state.centerX) ** 2 + (y - this.state.centerY) ** 2
    );
    if (unit === 0) return;

    this.inclX = (x - this.state.centerX) / unit;
    this.inclY = (y - this.state.centerY) / unit;
    this.particles.forEach(particle => {
      particle.setIncl(this.inclX, this.inclY);
    });
  }

  private getContext() {
    return this.canvas.current.getContext('2d');
  }

  private initParticle() {
    const p = this.getInitialParticlePos();
    this.particles.push(
      new Particle({
        color: this.props.colors[getRandomInt(this.props.colors.length)],
        ctx: this.getContext(),
        inclX: this.inclX,
        inclY: this.inclY,
        maxSize: this.props.maxSize,
        minSize: this.props.minSize,
        x: p.x,
        y: p.y,
      })
    );
  }

  private getInitialParticlePos() {
    const x = getRandomInt(this.state.centerX);
    let minY;
    let maxY;
    if (this.isSharp) {
      maxY = this.inclA * x;
      minY = Math.max(this.inclB * x + this.interceptB, this.inclC * x);
    } else {
      maxY = Math.min(this.inclA * x, this.inclB * x + this.interceptB);
      minY = this.inclC * x;
    }

    return { x, y: getRandomInt(maxY - minY) + minY };
  }

  private isInRange(particle) {
    let retval = true;

    const p = particle.getPos();
    const size = particle.getSize();
    const x = p.x;
    const y = p.y;
    if (this.isSharp) {
      const maxY = this.inclA * x;
      const minY = Math.max(this.inclB * x + this.interceptB, this.inclC * x);
      if (y - size >= maxY || y + size <= minY) {
        retval = false;
      }
    } else {
      const maxY = Math.min(this.inclA * x, this.inclB * x + this.interceptB);
      const minY = this.inclC * x;
      if (y - size >= maxY || y + size <= minY) {
        retval = false;
      }
    }

    return retval;
  }

  private initCanvas() {
    // リサイズ時、アニメーションを停止
    if (this.animationID !== null) {
      cancelAnimationFrame(this.animationID);
    }

    this.renderCanvas();
  }

  private renderCanvas() {
    const ctx = this.getContext();
    ctx.clearRect(0, 0, this.props.width, this.props.height);
    ctx.globalCompositeOperation = 'overlay';

    // 位置更新
    this.particles.forEach(particle => {
      particle.update();
    });

    // 範囲チェック
    // 範囲外なら削除し、新規追加
    this.particles = this.particles.filter(particle =>
      this.isInRange(particle)
    );
    _.times(this.props.quantity - this.particles.length, () => {
      this.initParticle();
    });

    // 描画
    _.times(this.props.corner, i => {
      ctx.save();

      const centerX = this.state.centerX;
      const centerY = this.state.centerY;
      const rad = this.state.rad;

      // 範囲外をトリミング
      const p1 = rotate(0, 0, centerX, centerY, rad * i);
      const p2 = rotate(0, 0, centerX, centerY, rad * (i + 1));
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.closePath();
      ctx.clip();

      // 描画
      this.particles.forEach(particle => {
        particle.drawAtRotatedPosition(centerX, centerY, rad * i);
      });

      ctx.restore();
    });

    this.animationID = requestAnimationFrame(() => this.renderCanvas());
  }
}

Kaleidoscope.propTypes = {
  colors: PropTypes.array,
  corner: PropTypes.number,
  height: PropTypes.number,
  maxSize: PropTypes.number,
  minSize: PropTypes.number,
  quantity: PropTypes.number,
  width: PropTypes.number,
};

Kaleidoscope.defaultProps = {
  colors: ['#FFD1B9', '#564138', '#2E86AB', '#F5F749', '#F24236'],
  corner: 7,
  height: 500,
  maxSize: 40,
  minSize: 20,
  quantity: 30,
  width: 500,
};

export default Kaleidoscope;
