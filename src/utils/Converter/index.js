// date converter sebagai request
export const dateConverterReq = timestamp => {
  const date = new Date(timestamp * 1000);

  const tahun = date.getFullYear();
  let bulan = date.getMonth() + 1;
  let tanggal = date.getDate();

  if (bulan < 10) {
    bulan = `0${bulan}`;
  }

  if (tanggal < 10) {
    tanggal = `0${tanggal}`;
  }

  const format = `${tahun}-${bulan}-${tanggal}`;

  return format;
};

// date converter sebagai response
export const dateConverterRes = timestamp => {
  const date = new Date(timestamp * 1000);
  const arrayBulan = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Mei',
    'Jun',
    'Jul',
    'Agu',
    'Sep',
    'Okt',
    'Nov',
    'Des'
  ];
  const arrayHari = [
    'Minggu',
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    'Jumat',
    'Sabtu'
  ];
  const tahun = date.getFullYear();
  const bulan = arrayBulan[date.getMonth()];
  const hari = arrayHari[date.getDay()];
  const tanggal = date.getDate();

  const format = `${hari}, ${tanggal} ${bulan} ${tahun}`;

  return format;
};

export const uriToFile = URI => {
  const splitDataURI = URI.split(',');

  const byteString =
    splitDataURI[0].indexOf('base64') >= 0
      ? atob(splitDataURI[1])
      : decodeURI(splitDataURI[1]);

  const mimeString = splitDataURI[0].split(':')[1].split(';')[0];

  const ia = new Uint8Array(byteString.length);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new File([ia], 'image', { type: mimeString });
};

// Extract an Base64 Image's File Extension
export const fileExtention = base64Data => {
  return base64Data.substring(
    'data:image/'.length,
    base64Data.indexOf(';base64')
  );
};
