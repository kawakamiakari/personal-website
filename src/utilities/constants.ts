/* eslint-disable import/prefer-default-export */
import { Page } from '../types/page';

export const PageLang: { [lang: string]: { [page in Page]: string } } = {
  ja: {
    top: 'トップ',
    about: 'ワタシについて',
    skill: 'スキル',
    work: 'ワーク',
  },
};
