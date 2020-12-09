import API from 'configs/api';

/**
 * service customer for get all data customer
 */
export const getCustomers = () => {
  return new Promise((resolve, reject) => {
    API.customers()
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        console.log(err);

        reject({ success: false, data: err });
      });
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
        console.log(err);

        reject({ success: false, data: err });
      });
  });
};

/**
 * service customer for edit data customer
 */
export const createCustomer = () => {};

/**
 * service customer for delete data customer
 */
export const deleteCustomer = () => {};

/**
 * service customer for edit data customer
 */
export const editCustomer = () => {};
