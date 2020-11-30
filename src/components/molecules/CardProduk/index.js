import useStyles from './styles';
import propTypes from 'prop-types';

function CardProduk({
    srcImage,
    nama,
    diskon,
    hargaNormal,
    hargaDiskon,
    rating,
    handleDetail
}) {
    const classes = useStyles();

    return (
        <div
            className={classes.cardProduk}
            onClick={handleDetail}>
            <div className={classes.gambar}>
                <img src={srcImage} alt="foto produk" className={classes.gambar} />
            </div>
            <div className={classes.desk}>
                <label className={classes.nama}>{nama}</label>
                <div className={classes.wrapperDiskonHarga}>
                    <span className={classes.diskon}>{diskon}</span>
                    <span className={classes.hargaNormal}>{hargaNormal}</span>
                </div>
                <label className={classes.hargaDiskon}>{hargaDiskon}</label>
                <label className={classes.rating}>{rating}</label>
            </div>
        </div>
    );
}

CardProduk.propTypes = {
    srcImage: propTypes.string,
    nama: propTypes.string,
    diskon: propTypes.string,
    hargaDiskon: propTypes.string,
    hargaNormal: propTypes.string,
    rating: propTypes.string,
    handleDetail: propTypes.func
};

export default CardProduk;
