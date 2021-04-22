// import API untuk melakukan pemanggilan
import API from 'configs/api';

/**
 * service read for dashboard
 */
export const readDashboard = type => {
  return new Promise((resolve, reject) => {
    const data = {
      params: {
        type: type ? type : 'product'
      }
    }
    API.dashboard(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};
