import React, { Component } from 'react';

import SkillStyles from '../styles/work.module.scss';

import KaleidoscopeGIF from '../images/kaleidoscope.gif';
import KaleidoscopeThumbnailGIF from '../images/kaleidoscope_thumbnail.gif';
import ThisSiteJPG from '../images/thissite.jpg';
import ThisSiteThumbnailJPG from '../images/thissite_thumbnail.jpg';

import PageTitle from './pagetitle';

type W = {
  discription: string;
  skills: string[];
  thumbnail: any;
  thumbnailHover: any;
  title: string;
  url: string;
};

const works: W[] = [
  {
    discription: '動的背景のnpmモジュール',
    skills: ['HTML', 'css', 'JavaScript', 'TypeScript', 'gulp'],
    thumbnail: KaleidoscopeThumbnailGIF,
    thumbnailHover: KaleidoscopeGIF,
    title: 'kaleidoscope',
    url: 'https://kawakamiakari.github.io/kaleidoscope/',
  },
  {
    discription: '',
    skills: ['HTML', 'SCSS', 'JavaScript', 'React.js', 'Gatsby'],
    thumbnail: ThisSiteThumbnailJPG,
    thumbnailHover: ThisSiteJPG,
    title: 'このサイト',
    url: null,
  },
];

const Work = ({ work }: { work: W }) => {
  const skills = work.skills.join(' / ');

  return (
    <a
      href={work.url}
      target="_blank"
      className={SkillStyles.work}
      rel="noreferrer"
    >
      <div className={SkillStyles.background}>
        <img src={work.thumbnail} alt="" className={SkillStyles.thumbnail} />
        <img
          src={work.thumbnailHover}
          alt=""
          className={SkillStyles.thumbnailHover}
        />
      </div>
      <div className={SkillStyles.caption}>
        <div className={SkillStyles.title}>{work.title}</div>
        <div className={SkillStyles.discription}>{work.discription}</div>
        <div className={SkillStyles.skills}>{skills}</div>
      </div>
    </a>
  );
};

class WorkPage extends Component {
  private Works = works.map(work => <Work key={work.title} work={work} />);

  public render() {
    return (
      <div id="work" className={`page ${SkillStyles.page}`}>
        <PageTitle color="#dde1df" title="ワーク" />
        <div className={SkillStyles.works}>{this.Works}</div>
      </div>
    );
  }
}

export default WorkPage;
