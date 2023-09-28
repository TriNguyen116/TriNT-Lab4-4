import * as ActionTypes from './ActionTypes';

export const comment = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENT:
      const newComment = {
        id: state.length, 
        ...action.payload
      };
      return state.concat(newComment);

    default:
      return state;
  }
};
