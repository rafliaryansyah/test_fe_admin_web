import { useState } from 'react';
import useStyles from './styles';

// react items carousel
import ItemsCarousel from 'react-items-carousel';

// material-ui core
import {
  Button,
  IconButton,
  Card,
  CardActionArea,
  CardMedia,
  CardActions
} from '@material-ui/core';
import { Edit, Delete, ChevronLeft, ChevronRight } from '@material-ui/icons';

function TabHighLight() {
  const classes = useStyles();

  const [state, setState] = useState({
    active: 0,
    history: 0
  });

  return (
    <div className={classes.wrapper}>
      <div>
        <div className={classes.wrapperCard}>
          <label className={classes.title}>highlight produk aktif</label>
          <br />
          <br />
          <ItemsCarousel
            infiniteLoop={false}
            gutter={12}
            activePosition={'center'}
            chevronWidth={60}
            disableSwipe={false}
            alwaysShowChevrons={false}
            numberOfCards={3}
            slidesToScroll={1}
            outsideChevron={true}
            showSlither={false}
            firstAndLastGutter={false}
            activeItemIndex={state.active}
            requestToChangeActive={value =>
              setState({ ...state, active: value })
            }
            leftChevron={
              <Button className={classes.buttonLeft}>
                <ChevronLeft />
              </Button>
            }
            rightChevron={
              <Button className={classes.buttonRight}>
                <ChevronRight />
              </Button>
            }>
            {Array.from(new Array(10)).map((_, i) => (
              <div key={i}>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Contemplative Reptile"
                      height="230"
                      image="https://ecs7.tokopedia.net/img/blog/seller/2020/04/voucher-toko.jpg"
                      title="Contemplative Reptile"
                    />
                  </CardActionArea>
                  <CardActions className={classes.action}>
                    <IconButton size="small" color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton size="small" color="primary">
                      <Delete />
                    </IconButton>
                  </CardActions>
                </Card>
              </div>
            ))}
          </ItemsCarousel>
        </div>
        <br />
        <br />
        <br />
        <div className={classes.wrapperCard}>
          <label className={classes.title}>highlight produk history</label>
          <br />
          <br />
          <ItemsCarousel
            infiniteLoop={false}
            gutter={12}
            activePosition={'center'}
            chevronWidth={60}
            disableSwipe={false}
            alwaysShowChevrons={false}
            numberOfCards={5}
            slidesToScroll={1}
            outsideChevron={true}
            showSlither={false}
            firstAndLastGutter={false}
            activeItemIndex={state.history}
            requestToChangeActive={value =>
              setState({ ...state, history: value })
            }
            leftChevron={
              <Button className={classes.buttonLeft}>
                <ChevronLeft />
              </Button>
            }
            rightChevron={
              <Button className={classes.buttonRight}>
                <ChevronRight />
              </Button>
            }>
            {Array.from(new Array(10)).map((_, i) => (
              <div key={i}>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Contemplative Reptile"
                      height="130"
                      image="https://ecs7.tokopedia.net/img/blog/seller/2020/04/voucher-toko.jpg"
                      title="Contemplative Reptile"
                    />
                  </CardActionArea>
                  <CardActions className={classes.action}>
                    <IconButton size="small" color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton size="small" color="primary">
                      <Delete />
                    </IconButton>
                  </CardActions>
                </Card>
              </div>
            ))}
          </ItemsCarousel>
        </div>
        <div className={classes.wrapperButton}>
          <Button variant="contained" color="primary">
            buat highlight
          </Button>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className={classes.wrapperCard}>
          <label className={classes.title}>highlight jasa aktif</label>
          <br />
          <br />
          <ItemsCarousel
            infiniteLoop={false}
            gutter={12}
            activePosition={'center'}
            chevronWidth={60}
            disableSwipe={false}
            alwaysShowChevrons={false}
            numberOfCards={3}
            slidesToScroll={1}
            outsideChevron={true}
            showSlither={false}
            firstAndLastGutter={false}
            activeItemIndex={state.active}
            requestToChangeActive={value =>
              setState({ ...state, active: value })
            }
            leftChevron={
              <Button className={classes.buttonLeft}>
                <ChevronLeft />
              </Button>
            }
            rightChevron={
              <Button className={classes.buttonRight}>
                <ChevronRight />
              </Button>
            }>
            {Array.from(new Array(10)).map((_, i) => (
              <div key={i}>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Contemplative Reptile"
                      height="230"
                      image="https://ecs7.tokopedia.net/img/blog/seller/2020/04/voucher-toko.jpg"
                      title="Contemplative Reptile"
                    />
                  </CardActionArea>
                  <CardActions className={classes.action}>
                    <IconButton size="small" color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton size="small" color="primary">
                      <Delete />
                    </IconButton>
                  </CardActions>
                </Card>
              </div>
            ))}
          </ItemsCarousel>
        </div>
        <br />
        <br />
        <br />
        <div className={classes.wrapperCard}>
          <label className={classes.title}>highlight jasa history</label>
          <br />
          <br />
          <ItemsCarousel
            infiniteLoop={false}
            gutter={12}
            activePosition={'center'}
            chevronWidth={60}
            disableSwipe={false}
            alwaysShowChevrons={false}
            numberOfCards={5}
            slidesToScroll={1}
            outsideChevron={true}
            showSlither={false}
            firstAndLastGutter={false}
            activeItemIndex={state.history}
            requestToChangeActive={value =>
              setState({ ...state, history: value })
            }
            leftChevron={
              <Button className={classes.buttonLeft}>
                <ChevronLeft />
              </Button>
            }
            rightChevron={
              <Button className={classes.buttonRight}>
                <ChevronRight />
              </Button>
            }>
            {Array.from(new Array(10)).map((_, i) => (
              <div key={i}>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Contemplative Reptile"
                      height="130"
                      image="https://ecs7.tokopedia.net/img/blog/seller/2020/04/voucher-toko.jpg"
                      title="Contemplative Reptile"
                    />
                  </CardActionArea>
                  <CardActions className={classes.action}>
                    <IconButton size="small" color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton size="small" color="primary">
                      <Delete />
                    </IconButton>
                  </CardActions>
                </Card>
              </div>
            ))}
          </ItemsCarousel>
        </div>
        <div className={classes.wrapperButton}>
          <Button variant="contained" color="primary">
            buat highlight
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TabHighLight;
