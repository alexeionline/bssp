import { FETCH_OBJECTS, RECEIVE_FETCHED_OBJECTS } from "../actions/objects";

const initialState = {
  isFetching: false,
  objects: []
};

export default function objects(state = initialState, action) {
  switch (action.type) {
    case FETCH_OBJECTS: {
      return {
        ...state,
        isFetching: true
      };
    }
    case RECEIVE_FETCHED_OBJECTS: {
      return {
        ...state,
        isFetching: false,
        objects: [...state.objects, ...action.objects]
      };
    }
    default: {
      return state;
    }
  }
}
