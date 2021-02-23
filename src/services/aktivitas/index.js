// import API untuk melakukan pemanggilan
import API from 'configs/api';

/**
 * service aktivitas
 */
export const aktivitas = (date, search, page) => {
  return new Promise((resolve, reject) => {
    const data = {
      params: {
        date: date ? date : '',
        search: search ? search : '',
        page: page ? page : 1
      }
    };

    API.logActivity(data)
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
