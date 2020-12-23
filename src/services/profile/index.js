// import API untuk melakukan pemanggilan
import API from 'configs/api';

/**
 * service customer for get data profile
 */
export const getProfile = () => {
  return new Promise((resolve, reject) => {
    API.profile()
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};

/**
 * service customer for edit data profile
 */
export const editProfile = (name, dob, gender, email, phone, photo) => {
  return new Promise((resolve, reject) => {
    const data = {
      type: 'form-data',
      body: {
        name: name,
        dob: dob,
        gender: gender,
        email: email,
        phone: phone,
        photo: photo
      }
    };

    API.profileUpdate(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};

/**
 * service customer for change password data profile
 */
export const changePasswordProfile = form => {
  return new Promise((resolve, reject) => {
    const data = {
      body: form
    };

    API.profileChangePassword(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};
