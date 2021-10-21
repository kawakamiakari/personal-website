import { Store } from '../components/store';
import { Action } from './action';

const reducer = (state: Store, action: Action): Store => {
  switch (action.type) {
    case 'onScrollFuncAdd':
      state.onScroll.push(action.func);
      return state;

    case 'pageChange':
      return action.page !== state.page
        ? { ...state, page: action.page }
        : state;

    default:
      return state;
  }
};

export default reducer;
