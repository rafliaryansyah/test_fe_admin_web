// import API untuk melakukan pemanggilan
import API from 'configs/api';

/**
 * service customer for get stores
 */
export const getStores = (status, search, page) => {
  return new Promise((resolve, reject) => {
    if (status) {
      const data = {
        params: {
          status: status ? status : null,
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
    } else if (search) {
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
    } else {
      const data = {
        params: {
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
    }
  });
};

/**
 * service customer for get detail store
 */
export const getStore = id => {
  return new Promise((resolve, reject) => {
    const data = {
      path: `${id}`
    };

    API.store(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};

/**
 * service customer for update status store
 */
export const updateStatusStore = id => {
  return new Promise((resolve, reject) => {
    const data = {
      path: `${id}/status`
    };

    API.storeUpdateStatus(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};

/**
 * service customer for update mode store
 */
export const updateModeStore = id => {
  return new Promise((resolve, reject) => {
    const data = {
      path: `${id}/update`
    };

    API.storeUpdateMode(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};

/**
 * service customer for get detail produk store
 */
export const getProduk = (idToko, idProduk) => {
  return new Promise((resolve, reject) => {
    const data = {
      path: `${idToko}/${idProduk}`
    };

    API.storeProduk(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};

/**
 * service customer for update status produk
 */
export const updateStatusProduk = (idToko, idProduk) => {
  return new Promise((resolve, reject) => {
    const data = {
      path: `${idToko}/${idProduk}/update`
    };

    API.storeUpdateStatusProduk(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};
