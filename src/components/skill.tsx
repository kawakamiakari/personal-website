import React, { Component } from 'react';

import SkillStyles from '../styles/skill.module.scss';

import PageTitle from '../components/pagetitle';

const experiences = [
  {
    date: '2016.9-2017.2, 2018.4-2019.4',
    name: 'イベント向けIoTデバイス開発',
    role: 'モバイル端末用デバイス操作アプリの設計/開発/テストを担当',
    skill: [
      'HTML',
      'Sass',
      'Javascript',
      'Bootstrap',
      'AngularJS',
      'jQuery',
      'GitLab',
    ],
  },
  {
    date: '2017.2-2018.4, 2019.4-2019.7',
    name: 'ストレージ製品開発',
    role: 'キャッシュ機能の設計/開発/テストを担当',
    skill: ['C', 'CUnit', 'Jenkins', 'git'],
  },
  {
    date: '2019.4-2019.8',
    name: '会場マッチングアプリ開発',
    role: 'Webアプリの設計/開発/テストを担当',
    skill: [
      'HTML',
      'Sass',
      'TypeScript',
      'Python',
      'Bootstrap',
      'Angular',
      'Django',
      'Jasmine',
      'Karma',
      'GitLab',
      'GitLab CI',
    ],
  },
  {
    date: '2019.8-2019.10',
    name: '不動産情報検索アプリ開発',
    role: 'Webアプリのスタイルを担当',
    skill: ['HTML', 'Sass', 'TypeScript', 'Vue.js', 'GitHub', 'Slack'],
  },
];

const Experience = ({ experience }) => {
  const skills = experience.skill.join('/');

  return (
    <div>
      <div>{experience.name}</div>
      <div>{experience.date}</div>
      <div>{experience.role}</div>
      <div>{skills}</div>
    </div>
  );
};

class Skill extends Component {
  private Experiences = experiences.map((experience, i) => (
    <Experience key={i} experience={experience} />
  ));

  public render() {
    return (
      <div id="skill" className={`page ${SkillStyles.page}`}>
        <PageTitle title="スキル" />
        <div className={SkillStyles.contents}>
          <div className={SkillStyles.experience}>{this.Experiences}</div>
          {/* <div className={SkillStyles.border} /> */}
          <div className={SkillStyles.skill}>スキル</div>
        </div>
      </div>
    );
  }
}

export default Skill;
