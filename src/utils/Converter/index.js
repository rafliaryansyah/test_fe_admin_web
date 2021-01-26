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
