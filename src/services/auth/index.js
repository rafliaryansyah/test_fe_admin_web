// import API untuk melakukan pemanggilan
import API from 'configs/api';

/**
 * service authentication for log in
 */
export const login = form => {
  return new Promise((resolve, reject) => {
    const data = {
      body: form
    };

    API.login(data)
      .then(res => {
        if (res.data.code === 200) {
          const token = JSON.stringify(res.data.token);

          localStorage.setItem('token', token);
        }

        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};

/**
 * service authentication for registration
 */
export const registration = () => {};
