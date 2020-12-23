// date converter sebagai request
export const dateConverterReq = timestamp => {
  const date = new Date(timestamp * 1000);
  const arrayBulan = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12'
  ];
  const tahun = date.getFullYear();
  const bulan = arrayBulan[date.getMonth()];
  const tanggal = date.getDate();

  const format = `${tahun}-${bulan}-${tanggal}`;

  return format;
};

// date converter sebagai response
export const dateConverterRes = timestamp => {
  const date = new Date(timestamp * 1000);
  const arrayBulan = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember'
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