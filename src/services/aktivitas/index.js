// import API untuk melakukan pemanggilan
import API from 'configs/api';

/**
 * service aktivitas
 */
export const aktivitas = () => {
  return new Promise((resolve, reject) => {
    API.logActivity()
      .then(res => {
        if (res.data.code === 200) {
          resolve({ success: true, data: res.data });
        }
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};
