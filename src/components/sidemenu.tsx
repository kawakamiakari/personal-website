import scrollTo from 'gatsby-plugin-smoothscroll';
import React, { useContext, useEffect } from 'react';

import { Page } from '../types/page';
import { AppStateContext } from './store';

import SidemenuStyles from '../styles/sidemenu.module.scss';

interface NavProps {
  text: string;
  target: Page;
}

function inactive() {
  const links = document.getElementsByClassName(`${SidemenuStyles.link}`);
  Array.from(links).forEach(link =>
    link.classList.remove(`${SidemenuStyles.active}`)
  );
}

function active(nav: HTMLElement) {
  inactive();
  nav.classList.add(`${SidemenuStyles.active}`);
}

const NavTitle = React.memo(({ text, target }: NavProps) => {
  return (
    <span
      id={`nav-${target}`}
      className={`${SidemenuStyles.link} ${SidemenuStyles.title}`}
      onClick={() => scrollTo(`#${target}`)}
      onKeyDown={() => scrollTo(`#${target}`)}
      role="menuitem"
      tabIndex={0}
    >
      {text}
    </span>
  );
});

const Nav = React.memo(({ text, target }: NavProps) => {
  return (
    <span
      id={`nav-${target}`}
      className={SidemenuStyles.link}
      onClick={() => scrollTo(`#${target}`)}
      onKeyDown={() => scrollTo(`#${target}`)}
      role="menuitem"
      tabIndex={0}
    >
      {text}
    </span>
  );
});

const Sidemenu = React.memo(() => {
  const { siteTitle, page } = useContext(AppStateContext);

  useEffect(() => {
    const sidemenu = document.querySelector('#sidemenu');
    if (page === 'top') {
      sidemenu.classList.add(`${SidemenuStyles.hidden}`);
      inactive();
    } else {
      sidemenu.classList.remove(`${SidemenuStyles.hidden}`);
      active(document.querySelector(`#nav-${page}`));
    }
  }, [page]);

  return (
    <div
      id="sidemenu"
      className={`${SidemenuStyles.container} ${SidemenuStyles.hidden}`}
      role="menu"
    >
      <NavTitle text={siteTitle} target="top" />
      <div className={SidemenuStyles.navs}>
        <Nav text="ワタシ" target="about" />
        <Nav text="スキル" target="skill" />
        <Nav text="ワーク" target="work" />
        <div className={SidemenuStyles.underline} />
      </div>
    </div>
  );
});

export default Sidemenu;
