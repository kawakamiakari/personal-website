import scrollTo from 'gatsby-plugin-smoothscroll';
import React, { useContext } from 'react';

import { AppContext } from '../components/store';

import SidemenuStyles from '../styles/sidemenu.module.scss';

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

const Sidemenu = React.memo(({ siteTitle }) => {
  const { page } = useContext(AppContext);

  const sidemenu = document.querySelector('#sidemenu');
  if (sidemenu) {
    if (page === 'top') {
      sidemenu.classList.add(`${SidemenuStyles.hidden}`);
      inactive();
    } else {
      sidemenu.classList.remove(`${SidemenuStyles.hidden}`);
      active(document.querySelector(`#nav-${page}`));
    }
  }

  return (
    <div
      id="sidemenu"
      className={`${SidemenuStyles.container} ${SidemenuStyles.hidden}`}
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
