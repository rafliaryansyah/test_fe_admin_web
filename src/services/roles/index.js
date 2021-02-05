import API from 'configs/api';

/**
 * service roles for read data roles
 */
export const readRoles = page => {
  return new Promise((resolve, reject) => {
    const data = {
      params: {
        page: page ? page : 1
      }
    };

    API.readRoles(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};

/**
 * service permissions for read data permissions
 */
export const readPermissions = () => {
  return new Promise((resolve, reject) => {
    API.readPermissions()
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};

/**
 * service roles for create data roles
 */
export const createRoles = form => {
  return new Promise((resolve, reject) => {
    const data = {
      body: form
    };

    API.createRoles(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};

/**
 * service roles for update data roles
 */
export const updateRoles = (id, form) => {
  return new Promise((resolve, reject) => {
    const data = {
      path: id,
      body: form
    };

    API.updateRoles(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};

/**
 * service roles for delete data roles
 */
export const deleteRoles = id => {
  return new Promise((resolve, reject) => {
    const data = {
      path: id
    };

    API.deleteRoles(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};
