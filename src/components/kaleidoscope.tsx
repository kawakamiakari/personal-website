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
}

class Kaleidoscope extends Component<Props, State> {
  public static propTypes;
  public static defaultProps;
  private canvas: React.RefObject<HTMLCanvasElement>;
  private animationID: number;
  private particles: Particle[] = [];

  constructor(props) {
    super(props);
    this.state = {
      centerX: props.width / 2,
      centerY: props.height / 2,
      rad: (2 * Math.PI) / props.corner,
    };
    this.canvas = React.createRef();
    this.animationID = null;
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
    const centerX = this.state.centerX;
    const centerY = this.state.centerY;
    const p = rotate(0, 0, centerX, centerY, this.state.rad);
    const la = centerY / centerX;
    const ra = (p.y - centerY) / (p.x - centerX);
    const rb = centerY - ra * p.y;
    const ba = p.y / p.x;

    const maxX = centerX;
    let x = getRandomInt(maxX);
    let minY = Math.max(ra * x + rb, ba * x);
    let maxY = la * x;
    this.particles.push(
      new Particle({
        color: '#ff0000',
        ctx: this.getContext(),
        x,
        y: getRandomInt(maxY - minY) + minY,
      })
    );

    x = getRandomInt(maxX);
    minY = Math.max(ra * x + rb, ba * x);
    maxY = la * x;
    this.particles.push(
      new Particle({
        color: '#00ff00',
        ctx: this.getContext(),
        x,
        y: getRandomInt(maxY - minY) + minY,
      })
    );

    x = getRandomInt(maxX);
    minY = Math.max(ra * x + rb, ba * x);
    maxY = la * x;
    this.particles.push(
      new Particle({
        color: '#0000ff',
        ctx: this.getContext(),
        x,
        y: getRandomInt(maxY - minY) + minY,
      })
    );
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
