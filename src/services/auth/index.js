// import API untuk melakukan pemanggilan
import API from 'configs/api';

/**
 * service authentication for log in
 */
export const login = async form => {

  const payload = {
    body: form
  };

  API.login(payload)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

/**
 * service authentication for registration
 */
export const registration = () => {};

/**
 * service authentication for registration
 */
export const logout = () => {};
