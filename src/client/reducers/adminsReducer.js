import { FETCH_ADMINS } from '../actions';

export default (state = [], { type, payload }) => {
  switch (type) {
    case FETCH_ADMINS:
      return payload;
    default:
      return state;
  }
};