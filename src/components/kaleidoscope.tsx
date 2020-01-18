/* tslint:disable:max-classes-per-file */
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { getRandomInt, rotate } from '../utils/math';

interface Props {
  colors: string[];
  corner: number;
  height: number;
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
  private v: number;

  constructor(props) {
    const shapes = ['square', 'circle', 'wave'];

    this.ctx = props.ctx;
    this.shape = shapes[getRandomInt(shapes.length)];
    this.size = getRandomInt(20) + 20;
    this.color = props.color;
    this.opacity = 0;
    this.x = props.x;
    this.y = props.y;
    this.v = getRandomInt(3) * 0.1 + 0.2; // 0.3〜0.6
  }

  public getPos() {
    return { x: this.x, y: this.y };
  }

  public getSize() {
    switch (this.shape) {
      case 'square':
        return this.size;
      case 'wave':
        return Math.sqrt(
          (this.size * 2.5 + this.size / 2) ** 2 +
            (this.size + this.size / 2) ** 2
        );
      case 'circle':
      default:
        return this.size;
    }
  }

  public draw() {
    const ctx = this.ctx;
    switch (this.shape) {
      case 'square':
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.size, this.size);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
        break;
      case 'wave':
        ctx.save();
        ctx.lineWidth = this.size / 2;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.size * 0.5, this.y + this.size);
        ctx.lineTo(this.x + this.size * 1, this.y);
        ctx.lineTo(this.x + this.size * 1.5, this.y + this.size);
        ctx.lineTo(this.x + this.size * 2, this.y);
        ctx.lineTo(this.x + this.size * 2.5, this.y + this.size);
        ctx.stroke();
        ctx.restore();
        break;
      case 'circle':
      default:
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
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
    if (this.opacity < 1) {
      this.opacity += 0.1;
    }
    this.y += this.v;
  }
}

class Kaleidoscope extends Component<Props, State> {
  public static propTypes;
  public static defaultProps;
  private canvas: React.RefObject<HTMLCanvasElement>;
  private animationID: number;
  private particles: Particle[] = [];

  // パーティクルの本体は以下の範囲内にある
  // y < incliA * x               原点と中心を通る直線
  // y > incliB * x + interceptB  中心と原点を回転させた点を通る直線
  // y > incliC * x               原点と原点を回転させた点を通る直線
  private incliA: number;
  private incliB: number;
  private interceptB: number;
  private incliC: number;

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
    this.incliA = centerY / centerX;
    this.incliB = (p.y - centerY) / (p.x - centerX);
    this.interceptB = centerY - this.incliB * centerX;
    this.incliC = p.y / p.x;
  }

  public componentDidMount() {
    this.initParticles();
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
        onMouseMove={() => {}}
        style={style}
      />
    );
  }

  private getContext() {
    return this.canvas.current.getContext('2d');
  }

  private initParticles() {
    _.times(this.props.quantity, i => {
      const p = this.getInitialParticlePos();
      this.particles.push(
        new Particle({
          color: this.props.colors[getRandomInt(this.props.colors.length)],
          ctx: this.getContext(),
          x: p.x,
          y: p.y,
        })
      );
    });
  }

  private getInitialParticlePos() {
    const p = rotate(
      0,
      0,
      this.state.centerX,
      this.state.centerY,
      this.state.rad
    );

    const x = getRandomInt(this.state.centerX);
    let minY;
    let maxY;
    if (p.x > this.state.centerX) {
      maxY = Math.min(this.incliA * x, this.incliB * x + this.interceptB);
      minY = this.incliC * x;
    } else {
      maxY = this.incliA * x;
      minY = Math.max(this.incliB * x + this.interceptB, this.incliC * x);
    }

    return { x, y: getRandomInt(maxY - minY) + minY };
  }

  private isInRange(particle) {
    let retval = true;

    const rp = rotate(
      0,
      0,
      this.state.centerX,
      this.state.centerY,
      this.state.rad
    );
    const p = particle.getPos();
    const size = particle.getSize();
    const x = p.x;
    const y = p.y;
    if (rp.x > this.state.centerX) {
      const maxY = Math.min(this.incliA * x, this.incliB * x + this.interceptB);
      const minY = this.incliC * x;
      if (y - size >= maxY || y + size <= minY) {
        retval = false;
      }
    } else {
      const maxY = this.incliA * x;
      const minY = Math.max(this.incliB * x + this.interceptB, this.incliC * x);
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
    this.particles = this.particles.filter(particle => {
      return this.isInRange(particle);
    });
    _.times(this.props.quantity - this.particles.length, i => {
      const p = this.getInitialParticlePos();
      this.particles.push(
        new Particle({
          color: this.props.colors[getRandomInt(this.props.colors.length)],
          ctx: this.getContext(),
          x: p.x,
          y: p.y,
        })
      );
    });

    // 描画
    this.particles.forEach(particle => {
      _.times(this.props.corner, i => {
        const centerX = this.state.centerX;
        const centerY = this.state.centerY;
        const rad = this.state.rad;

        ctx.save();

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
        particle.drawAtRotatedPosition(centerX, centerY, rad * i);

        ctx.restore();
      });
    });

    this.animationID = requestAnimationFrame(() => this.renderCanvas());
  }
}

Kaleidoscope.propTypes = {
  colors: PropTypes.array,
  corner: PropTypes.number,
  height: PropTypes.number,
  quantity: PropTypes.number,
  width: PropTypes.number,
};

Kaleidoscope.defaultProps = {
  colors: ['#FFD1B9', '#564138', '#2E86AB', '#F5F749', '#F24236'],
  corner: 7,
  height: 500,
  quantity: 30,
  width: 500,
};

export default Kaleidoscope;
