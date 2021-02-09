import API from 'configs/api';

/**
 * service customer for get all data customer
 */
export const getCustomers = (role, search, page) => {
  return new Promise((resolve, reject) => {
    if (role) {
      const data = {
        params: {
          role: role ? role : null,
          page: page ? page : 1
        }
      };

      API.customers(data)
        .then(res => {
          resolve({ success: true, data: res.data });
        })
        .catch(err => {
          reject({ success: false, data: err });
        });
    } else if (search) {
      const data = {
        params: {
          role: role ? role : null,
          search: search ? search : '',
          page: page ? page : 1
        }
      };

      API.customers(data)
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

      API.customers(data)
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
 * service customer for get per data customer
 */
export const getCustomer = id => {
  return new Promise((resolve, reject) => {
    const data = {
      path: `${id}/detail`
    };

    API.customer(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};

/**
 * service customer for update role per data customer
 */
export const updateRoleCustomer = (id, name) => {
  return new Promise((resolve, reject) => {
    const data = {
      body: {
        name: name
      },
      path: `${id}/update-role`
    };

    API.customerUpdateRole(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};

/**
 * service customer for update access admin per data customer
 */
export const accessAdminCustomer = (id, name) => {
  return new Promise((resolve, reject) => {
    const data = {
      body: {
        name: name
      },
      path: `${id}/access-admin`
    };

    API.customerAccessAdmin(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};

/**
 * service customer for delete per data customer
 */
export const deleteCustomer = id => {
  return new Promise((resolve, reject) => {
    const data = {
      path: `${id}/delete`
    };

    API.customerDelete(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};

/**
 * service customer for restore per data customer
 */
export const restoreCustomer = id => {
  return new Promise((resolve, reject) => {
    const data = {
      path: `${id}/restore`
    };

    API.customerRestore(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};
