import {
  FETCH_OBJECTS,
  RECEIVE_FETCHED_OBJECTS,
  ADD_OBJECT_FROM_FORM,
  CHANGE_OBJECT_FROM_FORM,
  RESET_OBJECT_FROM_FORM
} from "../actions/objects";

const initialState = {
  isFetching: false,
  objects: [],
  newObject: {
    id: Date.now(),
    city: "",
    address: "",
    map: ["", ""],
    square: "",
    price: "",
    com: {
      sewage: false,
      water: false,
      light: false,
      gas: false
    },
    description: "",
    phone: "",
    email: "",
    photos: []
  }
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
    case ADD_OBJECT_FROM_FORM: {
      return {
        ...state,
        objects: [...state.objects, state.newObject]
      };
    }
    case CHANGE_OBJECT_FROM_FORM: {
      const change = { ...state.newObject };
      change[action.payload.inputType] = action.payload.inputValue;
      return {
        ...state,
        newObject: change
      };
    }
    case RESET_OBJECT_FROM_FORM: {
      return {
        ...state,
        newObject: { ...initialState.newObject }
      };
    }
    default: {
      return state;
    }
  }
}
