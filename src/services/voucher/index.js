import API from 'configs/api';

/**
 * service voucher for create data voucher
 */
export const createVoucher = formdata => {
  return new Promise((resolve, reject) => {
    const data = {
      type: 'form-data',
      body: formdata
    };

    API.createVoucher(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};

/**
 * service voucher for get all data voucher
 */
export const readVoucher = (search, page) => {
  return new Promise((resolve, reject) => {
    const data = {
      params: {
        search: search ? search : '',
        page: page ? page : 1
      }
    };

    API.readVoucher(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};

/**
 * service voucher for update data voucher
 */
export const updateVoucher = (id, formdata) => {
  return new Promise((resolve, reject) => {
    const data = {
      type: 'form-data',
      body: formdata,
      path: `${id}`
    };

    API.updateVoucher(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};

/**
 * service voucher for delete data voucher
 */
export const deleteVoucher = id => {
  return new Promise((resolve, reject) => {
    const data = {
      path: `${id}/delete`
    };

    API.deleteVoucher(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};

/**
 * service voucher for restore data voucher
 */
export const restoreVoucher = id => {
  return new Promise((resolve, reject) => {
    const data = {
      path: `${id}/restore`
    };

    API.restoreVoucher(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};
