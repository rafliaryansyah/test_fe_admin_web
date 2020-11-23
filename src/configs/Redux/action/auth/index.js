export const login = (form) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const data = {
      body: form,
    };
    console.log(data);
  });
};
