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
          // simpan token ke localStorage
          const token = JSON.stringify(res.data.message);
          localStorage.setItem('token', token);

          resolve({ success: true, data: res.data });
        }
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};

/**
 * service authentication for log out
 */
export const logout = () => {
  return new Promise((resolve, reject) => {
    API.logout()
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};
