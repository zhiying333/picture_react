import { SAVE_TOKEN } from "../constant";


const initState = {
  token: localStorage.getItem('tonken_key') || '',
};
export default function userReducer (preState=initState, action) {
  const { type, data } = action;
  
  switch (type) {
    case SAVE_TOKEN:
      localStorage.setItem('token_key', data);
      return {
        ...preState,
        token: data
      };
    default:
      return preState;
  }
}