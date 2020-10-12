import React, { Component } from 'react';

import SkillStyles from '../styles/work.module.scss';

import PageTitle from '../components/pagetitle';

const works = [
  {
    discription: 'description',
    skills: ['skills'],
    thumbnail: '',
    thumbnailHover: null,
    title: 'title',
    url: '',
  },
  {
    discription: 'description',
    skills: ['skills'],
    thumbnail: '',
    thumbnailHover: null,
    title: 'title',
    url: '',
  },
  {
    discription: 'description',
    skills: ['skills'],
    thumbnail: '',
    thumbnailHover: null,
    title: 'title',
    url: '',
  },
  {
    discription: '動的背景のnpmモジュール',
    skills: ['HTML', 'css', 'JavaScript', 'TypeScript', 'gulp'],
    thumbnail: '',
    thumbnailHover: null,
    title: 'kaleidoscope',
    url: 'https://kawakamiakari.github.io/kaleidoscope/',
  },
  {
    discription: '',
    skills: ['HTML', 'SCSS', 'JavaScript', 'React.js', 'Gatsby'],
    thumbnail: '',
    thumbnailHover: null,
    title: 'このサイト',
    url: '',
  },
];

const Work = ({ work }) => {
  return <div className={SkillStyles.work}>{work.title}</div>;
};

class WorkPage extends Component {
  private Works = works.map((work, i) => <Work key={i} work={work} />);

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
