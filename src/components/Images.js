import React, { useReducer, useEffect, useContext } from 'react';
import axios from 'axios';
import { Context } from '../store';

const imagesService = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 1000,
});

const SET_DATA = 'SET_DATA';
const SET_ERROR = 'SET_ERROR';
const TOGGLE_LOADING = 'TOGGLE_LOADING';

const initialState = {
  data: [],
  error: null,
  loading: false,
}

function reducer(state, action) {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case TOGGLE_LOADING:
      return {
        ...state,
        loading: !state.loading
      };
    default:
      return state;
  }

}

export function Images() {
  const context = useContext(Context);
  const [state, dispatch] = useReducer(reducer, initialState);

  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  useEffect(() => {
    dispatch({ type: TOGGLE_LOADING });

    imagesService.get('/photos', {
      params: {
        _page: context.state.page,
        _limit: 9,
      },
      cancelToken: source.token,
    })
      .then(({ data }) => {
        dispatch({ type: SET_DATA, payload: data });
        dispatch({ type: TOGGLE_LOADING });
      })
      .catch((error) => {
        dispatch({ type: SET_ERROR, payload: error });
        dispatch({ type: TOGGLE_LOADING });
      });
    return () => {
      source.cancel('stopped request');
    }
  }, [context.state.page]);


  if (state.loading) return <p>Loading...</p>;
  if (state.error) return <p>Ups, Something went wrong!</p>;
  return (
    <div className="images-container">
      {!!state.data.length && state.data.map(({ thumbnailUrl, id, title }) => (
        <img
          src={thumbnailUrl}
          alt={title}
          key={id}
        />
      ))}
    </div>
  );
}
