import httpClient from '../http-common';

const getAll = () => {
  return httpClient.get('/product/list');
};

const get = (id) => {
  return httpClient.get('/user/'+id);
};

const update = (data) => {
  return httpClient.put('', data);
};

const signin = (data) => {
  return httpClient.post('/user/signin', data);
}

const signup = (data) => {
  return httpClient.post('/user/signup', data);
}

const getProductBasedOnSeller = (id) => {
  return httpClient.get('/seller/getproducts/' + id);
} 

const updateProductDetails = (data) => {
  return httpClient.post('/product/updateproduct', data);
}

const deactivateSeller = (id) => {
  return httpClient.get('/seller/deactivateseller/' + id);
}

export default { getAll, get, update, signin, signup, getProductBasedOnSeller, updateProductDetails, deactivateSeller };