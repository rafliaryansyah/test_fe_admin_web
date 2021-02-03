import API from 'configs/api';

/**
 * service kurir for read data kurir
 */
export const readKurir = (search, page) => {
  return new Promise((resolve, reject) => {
    const data = {
      params: {
        search: search ? search : '',
        page: page ? page : 1
      }
    };

    API.readKurir(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};

/**
 * service kurir for update data kurir
 */
export const updateKurir = (id, formdata) => {
  return new Promise((resolve, reject) => {
    const data = {
      path: id,
      body: formdata
    };

    API.updateKurir(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};

/**
 * service kurir for delete data kurir
 */
export const deleteKurir = id => {
  return new Promise((resolve, reject) => {
    const data = {
      path: id
    };

    API.deleteKurir(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};

/**
 * service kurir for restore data kurir
 */
export const restoreKurir = id => {
  return new Promise((resolve, reject) => {
    const data = {
      path: id
    };

    API.restoreKurir(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};
