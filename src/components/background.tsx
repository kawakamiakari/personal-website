import Kaleidoscope from 'ak-kaleidoscope';
import React, { useEffect } from 'react';

const Background: React.FC = () => {
  useEffect(() => {
    const kaleidoscope = new Kaleidoscope({
      color: ['#F3F1EF', '#F3F1EF', '#F5F7F6', '#F5F7F6', '#FDF3F7'],
      edge: 12,
      globalCompositeOperation: 'multiply',
      maxSize: 70,
      minSize: 40,
      quantity: 30,
      selector: '.kaleidoscope',
      shapes: ['circle', 'circle', 'square', 'square', 'drop'],
      speed: 0.3,
    });

    return () => {
      kaleidoscope.destroy();
    };
  }, []);

  return (
    <canvas className="kaleidoscope" style={{ backgroundColor: `#fdfdfc` }} />
  );
};

export default Background;
