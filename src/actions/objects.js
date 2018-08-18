import request from "superagent";

export const FETCH_OBJECTS = "FETCH_OBJECTS";
export const RECEIVE_FETCHED_OBJECTS = "RECEIVE_FETCHED_OBJECTS";
export const ADD_OBJECT_FROM_FORM = "ADD_OBJECT_FROM_FORM";
export const RESET_OBJECT_FROM_FORM = "RESET_OBJECT_FROM_FORM";
export const CHANGE_OBJECT_FROM_FORM = "CHANGE_OBJECT_FROM_FORM";

export const fetchObjects = () => dispatch => {
  dispatch(requestForFetching());
  return request
    .get("http://localhost:3000/api/objects")
    .end((err, res) => dispatch(receiveFetchedObjects(JSON.parse(res.text))));
};

export const requestForFetching = () => {
  return {
    type: FETCH_OBJECTS
  };
};

export const receiveFetchedObjects = objects => {
  return {
    type: RECEIVE_FETCHED_OBJECTS,
    objects: [...objects]
  };
};

export const addNewObjectFromForm = () => {
  return {
    type: ADD_OBJECT_FROM_FORM
  };
};

export const resetNewObjectFromForm = () => {
  return {
    type: RESET_OBJECT_FROM_FORM
  };
};

export const changeNewObjectFromForm = (inputType, inputValue) => {
  const payload = {
    inputType: inputType,
    inputValue: inputValue
  };
  return {
    type: CHANGE_OBJECT_FROM_FORM,
    payload
  };
};
