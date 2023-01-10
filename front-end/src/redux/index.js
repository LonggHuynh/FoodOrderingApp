

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
      let updatedState = [...state, { ...action.payload, img: null, quantity: 1 }]
      if (state.find(item => action.payload.id === item.id))
        updatedState = state.map(item => (item.id === action.payload.id) ? { ...item, quantity: item.quantity + 1 } : item)
      return updatedState;

    } case actionType.REMOVE_FROM_CART:
      return state.filter(item => action.payload.id !== item.id)
    case actionType.DECREASE_QUANTITY: {
      const updatedState = state.map(item => (item.id === action.payload.id) ? { ...item, quantity: item.quantity - 1 } : item)
      return updatedState.filter(item => item.quantity > 0);
    }
    case actionType.INCREASE_QUANTITY:
      return state.map(item => (item.id === action.payload.id) ? { ...item, quantity: item.quantity + 1 } : item);
    default:
      return state;
  }
};

const restaurantReducer = (state = null, action) => {
  switch (action.type) {
    case actionType.CLEAR_CART:
      return null
    case actionType.SET_RESTAURANT:
      return action.payload
    default:
      return state
  }
}

const priceReducer = (state = 0, action) => {
  switch (action.type) {
    case actionType.CLEAR_CART:
      return 0
    case actionType.ADD_TO_CART:
      return state + Number(action.payload.price)
    case actionType.DECREASE_QUANTITY:
      return state - Number(action.payload.price)

    case actionType.INCREASE_QUANTITY:
      return state + Number(action.payload.price)
    default:
      return state
  }
}


const initialState = JSON.parse(sessionStorage.getItem('state')) || { cart: { restaurant: null, items: [], price: 0 }, user: null };

const cartReducer = combineReducers({ restaurant: restaurantReducer, items: itemsReducer, price: priceReducer })

const reducer = combineReducers({ user: userReducer, cart: cartReducer })

const store = configureStore({ reducer, preloadedState: initialState })






store.subscribe(() => {
  console.log(store.getState())
  sessionStorage.setItem('state', JSON.stringify(store.getState()))
})

export default store