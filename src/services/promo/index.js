import API from 'configs/api';

/**
 * service promo for create data promo
 */
export const createPromo = formdata => {
  return new Promise((resolve, reject) => {
    const data = {
      type: 'form-data',
      body: formdata
    };

    API.createPromo(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};

/**
 * service promo for get all data promo
 */
export const readPromo = (search, page) => {
  return new Promise((resolve, reject) => {
    const data = {
      params: {
        search: search ? search : '',
        page: page ? page : 1
      }
    };

    API.readPromo(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};

/**
 * service promo for get detail data promo
 */
export const detailPromo = id => {
  return new Promise((resolve, reject) => {
    const data = {
      path: `${id}/detail`
    };

    API.detailPromo(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};

/**
 * service promo for update data promo
 */
export const updatePromo = (id, formdata) => {
  return new Promise((resolve, reject) => {
    const data = {
      type: 'form-data',
      body: formdata,
      path: `${id}`
    };

    API.updatePromo(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};

/**
 * service promo for delete data promo
 */
export const deletePromo = id => {
  return new Promise((resolve, reject) => {
    const data = {
      path: `${id}/delete`
    };

    API.deletePromo(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};

/**
 * service promo for restore data promo
 */
export const restorePromo = id => {
  return new Promise((resolve, reject) => {
    const data = {
      path: `${id}/restore`
    };

    API.restorePromo(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};
