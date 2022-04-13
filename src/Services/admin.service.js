import httpClient from '../http-common';

const getAll = () => {
  return httpClient.get('');
};

const get = (id) => {
  return httpClient.get(id);
};

const update = (data) => {
  return httpClient.put('', data);
};

const signin = (data) => {
  return httpClient.post('/admin/signin', data);
}

const getAllCategories = () => {
  return httpClient.get('/product/categories');
}

const getAllTypes = () => {
  return httpClient.get('/admin/getalltypes');
}

const deleteTypeById = (id) => {
  return httpClient.get('/admin/deletetype/' + id);
}

const getTypeById = (id) => {
  return httpClient.get('/admin/type/' + id);
}

const addNewType = (data) => {
  return httpClient.post('/admin/addtype', data );
}

const updateType = (id, data) => {
  return httpClient.post('/admin/update/type/' + id, data);
}

const getProductCount = () => {
  return httpClient.get('/product/productcount');
}

// GET COUNT OF USER, CATEGORY, TYPES
const countByRole = (role) => {
  return httpClient.get('/admin/' + role);
}

const countCategory = () => {
  return httpClient.get('/admin/getcategorycount');
}

const countType = () => {
  return httpClient.get('/admin/gettypecount');
}

export default { getAll, get, update, signin, countByRole, addNewType, getAllCategories, getAllTypes,
                  countCategory, countType, deleteTypeById, getTypeById, updateType, getProductCount };