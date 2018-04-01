import request from "superagent";

export const FETCH_OBJECTS = "FETCH_OBJECTS";
export const RECEIVE_FETCHED_OBJECTS = "RECEIVE_FETCHED_OBJECTS";

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
