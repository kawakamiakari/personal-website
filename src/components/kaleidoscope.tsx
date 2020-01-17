/* tslint:disable:max-classes-per-file */
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { getRandomInt, rotate } from '../utils/math';

interface Props {
  corner: number;
  height: number;
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
  private x: number;
  private y: number;
  private color: string;

  constructor(props) {
    this.ctx = props.ctx;
    this.x = props.x;
    this.y = props.y;
    this.color = props.color;
  }

  public getPos() {
    return { x: this.x, y: this.y };
  }

  public draw() {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.rect(this.x, this.y, 20, 30);
    ctx.fill();
    ctx.closePath();
  }

  public drawAtRotatedPosition(centerX: number, centerY: number, rad: number) {
    const ctx = this.ctx;
    const p = rotate(this.x, this.y, centerX, centerY, rad);
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.rect(p.x, p.y, 20, 30);
    ctx.fill();
    ctx.closePath();
  }

  public updatePosition(x = this.x, y = this.y) {
    this.x = x;
    this.y = y;
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
    let p = this.getInitialParticlePos();
    this.particles.push(
      new Particle({
        color: '#ff0000',
        ctx: this.getContext(),
        x: p.x,
        y: p.y,
      })
    );

    p = this.getInitialParticlePos();
    this.particles.push(
      new Particle({
        color: '#00ff00',
        ctx: this.getContext(),
        x: p.x,
        y: p.y,
      })
    );

    p = this.getInitialParticlePos();
    this.particles.push(
      new Particle({
        color: '#0000ff',
        ctx: this.getContext(),
        x: p.x,
        y: p.y,
      })
    );
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

    const centerX = this.state.centerX;
    const centerY = this.state.centerY;
    const rad = this.state.rad;

    _.times(this.props.corner, i => {
      ctx.beginPath();
      const p = rotate(0, 0, centerX, centerY, rad * i);
      ctx.strokeStyle = `rgb(${255 - 40 * i}, ${getRandomInt(255)}, ${40 * i})`;
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(p.x, p.y);
      ctx.closePath();
      ctx.stroke();
    });

    this.particles.forEach(particle => {
      const rotetedP = rotate(0, 0, centerX, centerY, rad);
      const p = particle.getPos();
      let x = p.x;
      let y = p.y + 1;
      if (rotetedP.x > this.state.centerX) {
        const maxY = Math.min(
          this.incliA * p.x,
          this.incliB * p.x + this.interceptB
        );
        const minY = this.incliC * p.x;
        if (y > maxY || y < minY) {
          const newP = this.getInitialParticlePos();
          x = newP.x;
          y = newP.y;
        }
      } else {
        const maxY = this.incliA * p.x;
        const minY = Math.max(
          this.incliB * p.x + this.interceptB,
          this.incliC * p.x
        );
        if (y > maxY || y < minY) {
          const newP = this.getInitialParticlePos();
          x = newP.x;
          y = newP.y;
        }
      }
      particle.updatePosition(x, y);
      particle.draw();
      _.times(this.props.corner, i => {
        particle.drawAtRotatedPosition(centerX, centerY, rad * i);
      });
    });

    this.animationID = requestAnimationFrame(() => this.renderCanvas());
  }
}

Kaleidoscope.propTypes = {
  corner: PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.number,
};

Kaleidoscope.defaultProps = {
  corner: 6,
  height: 500,
  width: 500,
};

export default Kaleidoscope;
