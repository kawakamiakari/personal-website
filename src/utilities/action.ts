import { Page } from '../types/page';

type OnScrollFuncAdd = {
  type: 'onScrollFuncAdd';
  func: () => void;
};

type PageChange = {
  type: 'pageChange';
  page: Page;
};

export type Action = OnScrollFuncAdd | PageChange;
