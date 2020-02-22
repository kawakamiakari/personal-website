import scrollTo from 'gatsby-plugin-smoothscroll';
import React, { Component } from 'react';

import { throttle } from 'throttle-debounce';

import SidemenuStyles from '../styles/sidemenu.module.scss';

interface Props {
  siteTitle: string;
}

function inactive() {
  const links = document.getElementsByClassName(`${SidemenuStyles.link}`);
  for (const link of links) {
    link.classList.remove(`${SidemenuStyles.active}`);
  }
}

function active(nav) {
  inactive();
  nav.classList.add(`${SidemenuStyles.active}`);
}

const NavTitle = ({ text, target }) => {
  return (
    <span
      id={`nav-${target}`}
      className={`${SidemenuStyles.link} ${SidemenuStyles.title}`}
      onClick={() => scrollTo(`#${target}`)}
    >
      {text}
    </span>
  );
};

const Nav = ({ text, target }) => {
  return (
    <span
      id={`nav-${target}`}
      className={SidemenuStyles.link}
      onClick={() => scrollTo(`#${target}`)}
    >
      {text}
    </span>
  );
};

class Sidemenu extends Component<Props, {}> {
  public componentDidMount() {
    window.addEventListener(
      'scroll',
      throttle(100, () => {
        this.getRect();
      }),
      false
    );
  }

  public render() {
    return (
      <div
        id="sidemenu"
        className={`${SidemenuStyles.container} ${SidemenuStyles.hidden}`}
      >
        <NavTitle text={this.props.siteTitle} target="top" />
        <div className={SidemenuStyles.navs}>
          <Nav text="ワタシ" target="about" />
          <Nav text="スキル" target="skill" />
          <Nav text="ワーク" target="work" />
          <div className={SidemenuStyles.underline} />
        </div>
      </div>
    );
  }

  private getRect() {
    const scrollTarget = {
      top: document.querySelector('#top'),
      about: document.querySelector('#about'),
      skill: document.querySelector('#skill'),
      work: document.querySelector('#work'),
    };

    let target;
    for (const key of Object.keys(scrollTarget)) {
      const clientRect = scrollTarget[key].getBoundingClientRect();
      const clientRectTop = clientRect.top;

      const scrollTop = document.body
        ? document.body.scrollTop
        : document.documentElement.scrollTop;
      const innerHeight = window.innerHeight;
      if (clientRectTop <= scrollTop + innerHeight / 2) {
        target = key;
      }
    }

    const sidemenu = document.querySelector('#sidemenu');
    if (target === 'top') {
      sidemenu.classList.add(`${SidemenuStyles.hidden}`);
      inactive();
    } else {
      sidemenu.classList.remove(`${SidemenuStyles.hidden}`);
      active(document.querySelector(`#nav-${target}`));
    }
  }
}

export default Sidemenu;
