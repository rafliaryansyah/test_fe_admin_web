import API from 'configs/api';

/**
 * service category for get all data category
 */
export const getCategory = (isDeleted, type, search, page) => {
  return new Promise((resolve, reject) => {
    const data = {
      params: {
        isDeleted: isDeleted,
        type: type,
        search: search ? search : '',
        page: page ? page : 1
      }
    };

    API.category(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};

/**
 * service category for get all data category
 */
export const getDetailCategoryProducts = (id, page) => {
  return new Promise((resolve, reject) => {
    const data = {
      path: `${id}`,
      params: {
        page: page ? page : 1
      }
    };

    API.detailCategoryProducts(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};

/**
 * service category for get all data category
 */
export const getDetailCategoryServices = (id, page) => {
  return new Promise((resolve, reject) => {
    const data = {
      path: `${id}`,
      params: {
        page: page ? page : 1
      }
    };

    API.detailCategoryServices(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};

/**
 * service category for create data category
 */
export const postCategory = formdata => {
  return new Promise((resolve, reject) => {
    const data = {
      type: 'form-data',
      body: formdata
    };

    API.createCategory(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};

/**
 * service category for update data category
 */
export const updateCategory = (id, formdata) => {
  return new Promise((resolve, reject) => {
    const data = {
      type: 'form-data',
      body: formdata,
      path: `${id}`
    };

    API.updateCategory(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};

/**
 * service category for delete data category
 */
export const deleteCategory = id => {
  return new Promise((resolve, reject) => {
    const data = {
      path: `${id}/delete`
    };

    API.deleteCategory(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};

/**
 * service category for restore data category
 */
export const restoreCategory = id => {
  return new Promise((resolve, reject) => {
    const data = {
      path: `${id}/restore`
    };

    API.restoreCategory(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};
