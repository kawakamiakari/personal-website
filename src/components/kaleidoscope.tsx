import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

interface Props {
  corner: number;
  height: number;
  width: number;
}

interface State {
  drawing: boolean;
}

const style = {
  backgroundColor: 'white',
  border: '1px solid gray',
};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function rotation2D(x, y, centerX, centerY, rad) {
  const X =
    Math.cos(rad) * (x - centerX) - Math.sin(rad) * (y - centerY) + centerX;
  const Y =
    Math.sin(rad) * (x - centerX) + Math.cos(rad) * (y - centerY) + centerY;
  return { X, Y };
}

class Kaleidoscope extends Component<Props, State> {
  public static propTypes;
  public static defaultProps;
  private canvas: React.RefObject<HTMLCanvasElement>;
  private animationID: number;

  constructor(props) {
    super(props);
    this.state = { drawing: false };

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
        onMouseDown={e =>
          this.startDrawing(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
        }
        onMouseUp={() => this.endDrawing()}
        onMouseLeave={() => this.endDrawing()}
        onMouseMove={e =>
          this.draw(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
        }
        style={style}
      />
    );
  }

  private getContext() {
    return this.canvas.current.getContext('2d');
  }

  private startDrawing(x, y) {
    this.setState({ drawing: true });
    const ctx = this.getContext();
    ctx.moveTo(x, y);
  }

  private draw(x, y) {
    if (!this.state.drawing) {
      return;
    }
    const ctx = this.getContext();
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  private endDrawing() {
    this.setState({ drawing: false });
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
    const rad = (Math.PI * 2) / this.props.corner;

    ctx.beginPath();
    _.times(this.props.corner, i => {
      const p = rotation2D(0, 0, centerX, centerY, rad * i);
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(p.X, p.Y);
    });

    ctx.strokeStyle = `rgb(${getRandomInt(255)}, ${getRandomInt(
      255
    )}, ${getRandomInt(255)})`;
    ctx.lineTo(getRandomInt(500), getRandomInt(500));

    ctx.closePath();
    ctx.stroke();

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
