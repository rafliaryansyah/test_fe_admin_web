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
export const getStore = (id, page) => {
  return new Promise((resolve, reject) => {
    const data = {
      path: `${id}`,
      params: {
        page: page ? page : 1
      }
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
 * service customer for get detail store
 */
export const getStoreReporting = (id, type, month, year) => {
  return new Promise((resolve, reject) => {
    const data = {
      path: `${id}/reports`,
      params: {
        type: type,
        month: month,
        year: year
      }
    };

    API.storeReporting(data)
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
export const updateStatusStore = (id, status, official_store) => {
  return new Promise((resolve, reject) => {
    const data = {
      body: {
        status: status,
        official_store: official_store
      },
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
 * service customer for get detail produk store
 */
export const getProduk = (username, idProduk) => {
  return new Promise((resolve, reject) => {
    const data = {
      path: `${username}/${idProduk}`
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
export const updateStatusProduk = (username, idProduk, status) => {
  return new Promise((resolve, reject) => {
    const data = {
      body: {
        status: status
      },
      path: `${username}/${idProduk}/update`
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
