// import API untuk melakukan pemanggilan
import API from 'configs/api';

/**
 * service customer for get stores
 */
export const getStores = (status, search, page) => {
  return new Promise((resolve, reject) => {
    const data = {
      params: {
        status: status ? status : '',
        search: search ? search : '',
        page: page ? page : 1
      }
    };

    API.stores(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};

/**
 * service customer for get detail store
 */
export const getStore = id => {
  return new Promise((resolve, reject) => {
    const data = {
      path: `${id}`
    }
    API.store(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};
