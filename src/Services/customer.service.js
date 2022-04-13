import httpClient from '../http-common';

const getAll = () => {
  return httpClient.get('');
};

const get = (id) => {
  return httpClient.get('/user/' + id);
};

const getAddress = (id) => {
  return httpClient.get('/user/address/'+ id);
}

const update = (data) => {
  return httpClient.put('', data);
};

const signin = (data) => {
  return httpClient.post('/customer/signin', data);
}

const signup = (data) => {
  return httpClient.post('/user/signup', data);
}

const updateProfile = (data) => {
  return httpClient.post('/user/updateprofile', data);
}

const addCartItems = (data) => {
  return httpClient.post('/customer/addtocart', data);
}

const getCartItems = (id) => {
  return httpClient.get('/customer/cart/' + id);
}

const updateCartQuantity = (data) => {
  return httpClient.post('/customer/updateCartQty', data);
}

const deleteItemOfCart = (id) => {
  return httpClient.get('/customer/deletecart/' + id);
}

const cartItemCount = (id) => {
  return httpClient.get('/customer/cartcount/' + id);
}

const checkItemInCart = (proId, userId) => {
  return httpClient.get('/customer/checkcart/' + proId + '/' + userId);
}

export default { getAll, get, update, signin, signup, getAddress, updateProfile, 
                 addCartItems, getCartItems, updateCartQuantity, deleteItemOfCart, cartItemCount, checkItemInCart };
