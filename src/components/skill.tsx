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
      'SCSS',
      'JavaScript',
      'AngularJS',
      'Bootstrap',
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
      'SCSS',
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
    skill: [
      'HTML',
      'SCSS',
      'TypeScript',
      'Vue.js',
      'GitHub',
      'inVision',
      'Slack',
    ],
  },
];

const skills = [
  {
    set: [
      [{ name: 'C', level: 'bussiness' }],
      [{ name: 'HTML5', level: 'bussiness' }],
      [
        { name: 'CSS3', level: 'bussiness' },
        { name: 'SCSS', level: 'bussiness' },
      ],
      [
        { name: 'JavaScript', level: 'bussiness' },
        { name: 'TypeScript', level: 'bussiness' },
      ],
      [{ name: 'Python', level: 'bussiness' }],
      [
        { name: 'VBA', level: 'hobby' },
        { name: 'GAS', level: 'hobby' },
      ],
    ],
    type: '言語',
  },
  {
    set: [
      [
        { name: 'Vue.js', level: 'bussiness' },
        { name: 'React.js', level: 'hobby' },
        { name: 'Gatsby', level: 'hobby' },
        { name: 'AngularJS', level: 'bussiness' },
        { name: 'Angular', level: 'bussiness' },
        { name: 'jQuery', level: 'bussiness' },
      ],
      [
        { name: 'Jasmine', level: 'bussiness' },
        { name: 'Karma', level: 'bussiness' },
      ],
      [{ name: 'Django', level: 'bussiness' }],
    ],
    type: 'フレームワーク',
  },
  {
    set: [
      [
        { name: 'git', level: 'bussiness' },
        { name: 'GitHub', level: 'bussiness' },
        { name: 'GitLab', level: 'bussiness' },
      ],
      [
        { name: 'GitLab CI', level: 'bussiness' },
        { name: 'Jenkins', level: 'bussiness' },
        { name: 'gulp', level: 'bussiness' },
      ],
      [
        { name: 'Adobe XD', level: 'bussiness' },
        { name: 'inVision', level: 'bussiness' },
      ],
      [{ name: 'Slack', level: 'bussiness' }],
    ],
    type: 'ツール',
  },
];

const Experiences = ({ experience }) => {
  const skill = experience.skill.join(' / ');

  return (
    <div className={SkillStyles.container}>
      <div className={SkillStyles.name}>{experience.name}</div>
      <div className={SkillStyles.role}>{experience.role}</div>
      <div className={SkillStyles.date}>{experience.date}</div>
      <div className={SkillStyles.skill}>{skill}</div>
    </div>
  );
};

const Skills = ({ skill }) => {
  const set = skill.set
    .map(group => group.map(s => s.name).join(' / '))
    .join('<br />');

  return (
    <div className={SkillStyles.container}>
      <div className={SkillStyles.type}>{skill.type}</div>
      <div
        className={SkillStyles.skill}
        dangerouslySetInnerHTML={{ __html: set }}
      />
    </div>
  );
};

class SkillPage extends Component {
  private Experiences = experiences.map((experience, i) => (
    <Experiences key={i} experience={experience} />
  ));
  private Skills = skills.map((skill, i) => <Skills key={i} skill={skill} />);

  public render() {
    return (
      <div id="skill" className={`page ${SkillStyles.page}`}>
        <PageTitle title="スキル" />
        <div className={SkillStyles.contents}>
          <div className={SkillStyles.experiences}>{this.Experiences}</div>
          <div className={SkillStyles.border} />
          <div className={SkillStyles.skills}>{this.Skills}</div>
        </div>
      </div>
    );
  }
}

export default SkillPage;
