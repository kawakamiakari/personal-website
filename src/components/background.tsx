import React from 'react';

import Particles from 'react-particles-js';

import './background.css';

const Background = () => {
  return (
    <Particles
      className="background"
      params={{
        interactivity: {
          events: {
            onclick: {
              enable: true,
              mode: 'repulse',
            },
            onhover: {
              enable: true,
              mode: 'bubble',
            },
          },
          modes: {
            bubble: {
              distance: 150,
              opacity: 0.2,
              size: 0,
            },
            repulse: {
              distance: 300,
              random: true,
            },
          },
        },
        particles: {
          line_linked: {
            enable: false,
          },
          move: {
            out_mode: 'out',
            random: true,
            speed: 0.5,
          },
          number: {
            value: 1500,
          },
          opacity: {
            anim: {
              enable: true,
              opacity_min: 0.05,
              speed: 1,
            },
          },
          size: {
            random: true,
            value: 10,
          },
        },
      }}
    />
  );
};

export default Background;
