

import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'





export const actionType = {
  SET_USER: "SET_USER",
  ADD_TO_CART: "ADD_TO_CART",
  CLEAR_CART: "CLEAR_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  DECREASE_QUANTITY: "DECREASE_QUANTITY",
  INCREASE_QUANTITY: "INCREASE_QUANTITY",
  SET_RESTAURANT: "SET_RESTAURANT"


};


const userReducer = (state = null, action) => {

  switch (action.type) {
    case actionType.SET_USER:
      return action.payload
    default:
      return state
  }
}

const itemsReducer = (state = [], action) => {
  switch (action.type) {
    case actionType.CLEAR_CART:
      return []
    case actionType.ADD_TO_CART: {
      if (state.find(item => action.payload.id === item.id)) {
        const updatedState = state.map(item => {
          if (item.id === action.payload.id) {
            const updatedItem = { ...item };
            updatedItem.quantity++;
            return updatedItem;
          }
          return item;
        });
        return updatedState;
      }
      return [...state, { ...action.payload, quantity: 1 }]

    } case actionType.REMOVE_FROM_CART:
      return state.filter(item => action.payload.id !== item.id)
    case actionType.DECREASE_QUANTITY: {
      const updatedState = state.map(item => {
        if (item.id === action.payload.id) {
          const updatedItem = { ...item };
          updatedItem.quantity--;
          return updatedItem;
        }
        return item;
      });
      return updatedState.filter(item => item.quantity > 0);
    }
    case actionType.INCREASE_QUANTITY: {
      const updatedState = state.map(item => {
        if (item.id === action.payload.id) {
          const updatedItem = { ...item };
          updatedItem.quantity++;
          return updatedItem;
        }
        return item;
      });
      return updatedState;
    }
    default:
      return state;
  }
};

const restaurantIdReducer = (state = null, action) => {
  if (action.type === actionType.SET_RESTAURANT)
    return action.payload
  return state
}




const initialState = JSON.parse(localStorage.getItem('state')) || { cart: { restaurantId: null, items: [] }, user: null };

const cartReducer = combineReducers({ restaurantId: restaurantIdReducer, items: itemsReducer })

const reducer = combineReducers({ user: userReducer, cart: cartReducer })

const store = configureStore({ reducer, preloadedState: initialState })






store.subscribe(() => {
  console.log(store.getState())
  localStorage.setItem('state', JSON.stringify(store.getState()))
})

export default store