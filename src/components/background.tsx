import Kaleidoscope from 'ak-kaleidoscope';
import React, { Component } from 'react';

class Background extends Component {
  public componentDidMount() {
    new Kaleidoscope({
      selector: '.kaleidoscope',
      edge: 12,
      shapes: ['circle', 'circle', 'square', 'square', 'drop'],
      minSize: 40,
      maxSize: 70,
      color: ['#F3F1EF', '#F3F1EF', '#F5F7F6', '#F5F7F6', '#FDF3F7'],
      globalCompositeOperation: 'multiply',
      quantity: 30,
      speed: 0.3,
    });
  }

  public render() {
    return (
      <canvas className="kaleidoscope" style={{ backgroundColor: `#fdfdfc` }} />
    );
  }
}

export default Background;
