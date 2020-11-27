import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    cardProduk: {
        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
        borderRadius: 15
    },

    gambar: {
        objectFit: 'cover',
        width: '100%',
        height: '100%',
        margin: 'auto'
    },

    desk: {
        padding: 10,
        display: 'grid',
        gridGap: 5
    },

    nama: {
        fontSize: 13,
        color: '#424242'
    },

    wrapperDiskonHarga: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gridGap: 15
    },

    diskon: {
        fontSize: 10,
        padding: 3,
        borderRadius: 3,
        backgroundColor: '#ec585830',
        color: '#ec5858'
    },

    hargaNormal: {
        fontSize: 10,
        color: '#c4c4c4',
        textDecoration: 'line-through'
    },

    hargaDiskon: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#424242'
    }
}));

export default useStyles;
