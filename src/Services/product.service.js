import httpClient from '../http-common';

const getAll = () => {
  return httpClient.get('/product/list');
};

const get = (id) => {
  return httpClient.get('/product/subtype' + id);
};

const update = (data) => {
  return httpClient.put('', data);
};

const getAllCategories = () => {
  return httpClient.get('/product/categories');
}

const getAllTypesinCategory = (id) => {
  return httpClient.get('/product/alltypes/' + id);
}

const addNewProduct = (data) => {
  return httpClient.post('/product/addproduct', data);
}

const getImage = (data) => {
  return httpClient.get("/product/image/" + data);
}

const getProductById = (id) => {
  return httpClient.get("/product/" + id);
} 

const getProductsByCategory = (category) => {
  return httpClient.get('/product/sort/' + category)
}

const deleteProductById = (id) => {
  return httpClient.get('/product/deleteproduct/' + id);
}


export default { getAll, get, update, getAllCategories, getAllTypesinCategory, addNewProduct, getImage, getProductById,
                  getProductsByCategory, deleteProductById };