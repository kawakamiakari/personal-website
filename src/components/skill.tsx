import React, { Component } from 'react';

import SkillStyles from '../styles/skill.module.scss';

import PageTitle from './pagetitle';

interface Experience {
  date: string;
  name: string;
  role: string;
  skill: string[];
}

interface Skill {
  set: { name: string; level: string }[][];
  type: string;
}

const experiences: Experience[] = [
  {
    date: '2016.9-2017.2, 2018.4-2019.4',
    name: 'イベント向けIoTデバイス開発',
    role: 'モバイル端末用デバイス操作アプリの設計/開発/テストを担当',
    skill: [
      'HTML',
      'Sass',
      'JavaScript',
      'TypeScript',
      'shell script',
      'AngularJS',
      'Angular',
      'jQuery',
      'Bootstrap',
      'GitLab',
      'Raspberry pi',
      'IoT',
    ],
  },
  {
    date: '2017.2-2018.4, 2019.4-2019.7',
    name: 'ストレージ製品開発',
    role: 'キャッシュ機能の設計/開発/テストを担当',
    skill: ['C', 'CUnit', 'Jenkins', 'git'],
  },
  {
    date: '2019.4-2019.8, 2020.10-2020.12',
    name: '会場マッチングアプリ開発',
    role: 'Webアプリの設計/開発/テストを担当',
    skill: [
      'HTML',
      'Sass',
      'TypeScript',
      'Python',
      'Angular',
      'Bootstrap',
      'Jasmine',
      'Karma',
      'Django',
      'GitLab',
      'GitLab CI',
      'AI',
    ],
  },
  {
    date: '2019.8-2019.10',
    name: '不動産情報検索アプリ開発',
    role: 'Webアプリのスタイルを担当',
    skill: [
      'HTML',
      'Sass',
      'TypeScript',
      'Vue.js',
      'GitHub',
      'inVision',
      'Slack',
      'AI',
    ],
  },
  {
    date: '2020.12-2021.4',
    name: 'ランディングページ作成ツール開発',
    role: 'Webアプリの設計/開発を担当',
    skill: [
      'HTML',
      'CSS',
      'JavaScript',
      'TypeScript',
      'Python',
      'React.js',
      'Django',
      'PostgresSQL',
      'GitHub',
      'Figma',
      'Slack',
    ],
  },
  {
    date: '2020.12-2021.9',
    name: 'ストリームデータ処理基盤開発',
    role: `プラグイン/Webアプリの設計/開発/テストを担当
    プロジェクトリーダー`,
    skill: [
      'HTML',
      'CSS',
      'TypeScript',
      'Java',
      'Python',
      'React.js',
      'Apache Kafka',
      'Apache Flink',
      'GitHub',
      'Slack',
    ],
  },
  {
    date: '2021.10-2022.03',
    name: 'テスト採点システム開発',
    role: `採点用Webアプリの設計/開発/テストを担当
    プロジェクトリーダー`,
    skill: ['HTML', 'CSS', 'Java', 'Spring Boot', 'MySQL', 'GitHub'],
  },
  {
    date: '2021.10-2022.08',
    name: 'おもちゃのレンタルサービス業務システム開発',
    role: 'Webアプリの開発を担当',
    skill: [
      'HTML',
      'Sass',
      'TypeScript',
      'React.js',
      'DynamoDB',
      'Docker',
      'AWS Amplify',
      'GitHub',
      'Figma',
      'Slack',
    ],
  },
  {
    date: '2022.04-2022.08, 2023.04-現在',
    name: '営業職向けDX推進アプリ開発',
    role: `採点用Webアプリの設計を担当
    テックリード`,
    skill: [
      'HTML',
      'Sass',
      'TypeScript',
      'React.js',
      'DynamoDB',
      'AWS Amplify',
      'git',
      'miro',
      'Figma',
    ],
  },
];

const skills: Skill[] = [
  {
    set: [
      [{ name: 'C', level: 'bussiness' }],
      [{ name: 'Java', level: 'bussiness' }],
      [{ name: 'HTML5', level: 'bussiness' }],
      [
        { name: 'CSS3', level: 'bussiness' },
        { name: 'Sass', level: 'bussiness' },
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
        { name: 'Figma', level: 'bussiness' },
      ],
      [{ name: 'Slack', level: 'bussiness' }],
    ],
    type: 'ツール',
  },
  {
    set: [
      [{ name: '応用情報技術者試験合格 (2017.12)', level: 'bussiness' }],
      [
        {
          name: 'AWS Certified Cloud Practitioner (2022.05)',
          level: 'bussiness',
        },
      ],
    ],
    type: '資格',
  },
];

const Experiences = ({ experience }: { experience: Experience }) => {
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

const Skills = ({ skill }: { skill: Skill }) => {
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
  private Experiences = experiences.map(experience => (
    <Experiences key={experience.name} experience={experience} />
  ));

  private Skills = skills.map(skill => (
    <Skills key={skill.type} skill={skill} />
  ));

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
