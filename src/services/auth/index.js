// import API untuk melakukan pemanggilan
import API from 'configs/api';

/**
 * service authentication for log in
 */
export const login = async form => {
  return new Promise((resolve, reject) => {
    const payload = {
      body: form
    };

    API.login(payload)
      .then(res => {
        console.log(res.data);

        if (res.data.code === 200) {
          if (res && res.data && res.data.token) {
            const token = JSON.stringify(res.data.token);

            localStorage.setItem('token', token);
          }
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
 * service authentication for registration
 */
export const registration = () => {};

/**
 * service authentication for registration
 */
export const logout = () => {};
