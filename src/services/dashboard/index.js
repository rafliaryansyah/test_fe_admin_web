// import API untuk melakukan pemanggilan
import API from 'configs/api';

/**
 * service read for dashboard
 */
export const readDashboard = () => {
  return new Promise((resolve, reject) => {
    API.dashboard()
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};
