/* tslint:disable:max-classes-per-file */
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

interface Props {
  corner: number;
  height: number;
  width: number;
}

interface State {
  rad: number;
}

const style = {
  backgroundColor: 'white',
  border: '1px solid gray',
};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function rotate(x, y, centerX, centerY, rad) {
  const X =
    Math.cos(rad) * (x - centerX) - Math.sin(rad) * (y - centerY) + centerX;
  const Y =
    Math.sin(rad) * (x - centerX) + Math.cos(rad) * (y - centerY) + centerY;
  return { X, Y };
}
class Particle {
  private ctx: CanvasRenderingContext2D;
  private x: number;
  private y: number;
  private color: string;

  constructor(props) {
    this.ctx = props.ctx;
    this.x = getRandomInt(100);
    this.y = getRandomInt(100);
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
}

class Kaleidoscope extends Component<Props, State> {
  public static propTypes;
  public static defaultProps;
  private canvas: React.RefObject<HTMLCanvasElement>;
  private animationID: number;
  private particles: Particle[] = [];

  constructor(props) {
    super(props);
    this.state = { rad: (Math.PI * 2) / props.corner };
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
    this.particles.push(
      new Particle({ ctx: this.getContext(), color: '#ff0000' })
    );
    this.particles.push(
      new Particle({ ctx: this.getContext(), color: '#00ff00' })
    );
    this.particles.push(
      new Particle({ ctx: this.getContext(), color: '#0000ff' })
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

    const centerX = this.props.width / 2;
    const centerY = this.props.height / 2;
    const rad = this.state.rad;

    ctx.beginPath();
    _.times(this.props.corner, i => {
      const p = rotate(0, 0, centerX, centerY, rad * i);
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(p.X, p.Y);
    });

    ctx.strokeStyle = `rgb(${getRandomInt(255)}, ${getRandomInt(
      255
    )}, ${getRandomInt(255)})`;
    ctx.lineTo(getRandomInt(500), getRandomInt(500));

    ctx.closePath();
    ctx.stroke();

    this.particles.forEach(particle => {
      particle.draw();
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
