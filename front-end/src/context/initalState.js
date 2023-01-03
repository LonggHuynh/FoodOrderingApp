

const user = JSON.parse(localStorage.getItem('user'))
const cart = JSON.parse(localStorage.getItem("cart"))


console.log(user)



export const initialState = {
  user,
  cart: cart || []
};
