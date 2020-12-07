import API from 'configs/api';

/**
 * service customer for get data customer
 */
export const getCustomer = () => {
  return new Promise((resolve, reject) => {
    API.customers()
      .then(res => {
        if (res.data && res.data.code === 200) {
          console.log(res.data);
        }

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
