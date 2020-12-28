// import API untuk melakukan pemanggilan
import API from 'configs/api';

// main
/**
 * service customer for read banners
 */
export const readBanners = () => {
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

/**
 * service customer for create banners
 */
export const createMainBanners = formdata => {
  return new Promise((resolve, reject) => {
    const data = {
      type: 'form-data',
      body: formdata
    };

    API.createBannersMain(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};

/**
 * service customer for update banners
 */
export const updateMainBanners = (id, formdata) => {
  return new Promise((resolve, reject) => {
    const data = {
      type: 'form-data',
      body: formdata,
      path: id
    };

    API.updateBannersMain(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};

/**
 * service customer for delete banners
 */
export const deleteMainBanners = id => {
  return new Promise((resolve, reject) => {
    const data = {
      path: `${id}/delete`
    };

    API.deleteBannersMain(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};

/**
 * service customer for restore banners
 */
export const restoreMainBanners = id => {
  return new Promise((resolve, reject) => {
    const data = {
      path: `${id}/restore`
    };

    API.restoreBannersMain(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};

// highlight
/**
 * service customer for create banners
 */
export const createHighLightBanners = formdata => {
  return new Promise((resolve, reject) => {
    const data = {
      type: 'form-data',
      body: formdata
    };

    API.createBannersHighlight(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};

/**
 * service customer for update banners
 */
export const updateHighLightBanners = (id, formdata) => {
  return new Promise((resolve, reject) => {
    const data = {
      type: 'form-data',
      body: formdata,
      path: id
    };

    API.updateBannersHighlight(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};

/**
 * service customer for delete banners
 */
export const deleteHighLightBanners = id => {
  return new Promise((resolve, reject) => {
    const data = {
      path: `${id}/delete`
    };

    API.deleteBannersHighlight(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};

/**
 * service customer for restore banners
 */
export const restoreHighLightBanners = id => {
  return new Promise((resolve, reject) => {
    const data = {
      path: `${id}/restore`
    };

    API.restoreBannersHighlight(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};

// mini
/**
 * service customer for create banners
 */
export const createMiniBanners = formdata => {
  return new Promise((resolve, reject) => {
    const data = {
      type: 'form-data',
      body: formdata
    };

    API.createBannersMini(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};

/**
 * service customer for update banners
 */
export const updateMiniBanners = (id, formdata) => {
  return new Promise((resolve, reject) => {
    const data = {
      type: 'form-data',
      body: formdata,
      path: id
    };

    API.updateBannersMini(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};

/**
 * service customer for delete banners
 */
export const deleteMiniBanners = id => {
  return new Promise((resolve, reject) => {
    const data = {
      path: `${id}/delete`
    };

    API.deleteBannersMini(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};

/**
 * service customer for restore banners
 */
export const restoreMiniBanners = id => {
  return new Promise((resolve, reject) => {
    const data = {
      path: `${id}/restore`
    };

    API.restoreBannersMini(data)
      .then(res => {
        resolve({ success: true, data: res.data });
      })
      .catch(err => {
        reject({ success: false, data: err });
      });
  });
};
