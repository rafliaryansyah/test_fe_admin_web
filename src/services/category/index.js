import API from 'configs/api';

/**
 * service category for get all data category
 */
export const getCategory = () => {
  return new Promise((resolve, reject) => {
    API.category()
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
export const postCategory = form => {
  return new Promise((resolve, reject) => {
    const data = {
      body: form
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
export const updateCategory = id => {
  return new Promise((resolve, reject) => {
    const data = {
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
