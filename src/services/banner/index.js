// import API untuk melakukan pemanggilan
import API from 'configs/api';

/**
 * service customer for get banners
 */
export const getBanners = () => {
  return new Promise((resolve, reject) => {
    API.banners()
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};
