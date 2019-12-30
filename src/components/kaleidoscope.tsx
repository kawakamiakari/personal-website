import PropTypes from 'prop-types';
import React, { Component } from 'react';

interface Props {
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

class Kaleidoscope extends Component<Props, State> {
  public static propTypes;
  public static defaultProps;
  private canvas: React.RefObject<HTMLCanvasElement>;

  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.state = { drawing: false };
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
}

Kaleidoscope.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
};

Kaleidoscope.defaultProps = {
  height: 500,
  width: 500,
};

export default Kaleidoscope;
