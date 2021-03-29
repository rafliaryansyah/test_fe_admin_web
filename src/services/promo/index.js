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
export const readPromo = (isDeleted, per_page, search, page) => {
  return new Promise((resolve, reject) => {
    const data = {
      params: {
        isDeleted: isDeleted,
        per_page: per_page ? per_page : 10,
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
 * service promo for get detail data promo tipe product
 */
export const detailPromoProduct = (id, page) => {
  return new Promise((resolve, reject) => {
    const data = {
      path: `${id}/detail-products`,
      params: {
        page: page ? page : 1
      }
    };

    API.detailPromoProduct(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};

/**
 * service promo for get detail data promo tipe service
 */
export const detailPromoService = (id, page) => {
  return new Promise((resolve, reject) => {
    const data = {
      path: `${id}/detail-services`,
      params: {
        page: page ? page : 1
      }
    };

    API.detailPromoService(data)
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
 * service promo for update data status promo
 */
export const updateStatusPromo = id => {
  return new Promise((resolve, reject) => {
    const data = {
      path: `${id}/status`
    };

    API.updateStatusFiturPromo(data)
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
