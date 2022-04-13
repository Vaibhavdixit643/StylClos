import httpClient from '../http-common';

const getAll = () => {
  return httpClient.get('');
};

const get = (id) => {
  return httpClient.get('/user/' + id);
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

const updateProfile = (data) => {
  return httpClient.post('/user/updateprofile', data);
}

const getAddress = (id) => {
  return httpClient.get('/user/address/' + id);
}

const deactivateCustomer = (id) => {
  return httpClient.get('/user/deactivate/' + id)
}

export default { getAll, get, update, signin, signup, updateProfile, getAddress, deactivateCustomer };
