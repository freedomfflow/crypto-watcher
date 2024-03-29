import React from 'react';
import { makeStyles, Container, Typography } from '@material-ui/core';
import { Carousel } from '../../components'

const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: 'url(./banner2.jpg)',
  },
  bannerContent: {
    height: 400,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 25,
    justifyContent: 'space-around'
  },
  tagline: {
    display: 'flex',
    height: '40%',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center'
  }
}));

const Banner = () => {
  const classes = useStyles();

  return (
      <div className={classes.banner}>
        <Container className={classes.bannerContent}>
          <div className={classes.tagline}>
            <Typography
                variant='h2'
                style={{
                  fontWeight: 'bold',
                  marginBottom: 15,
                  fontFamily: 'Montserrat'
                }}
            >
              Crypto Watcher
            </Typography>
            <Typography
              variant='subtitle2'
              style={{
                color: 'darkgrey',
                textTransform: 'capitalize',
                fontFamily: 'Montserrat'
              }}
            >
              Get all the info and track your favorite crypto currencies!
            </Typography>
          </div>
          <Carousel />
        </Container>
      </div>
  );
};

export default Banner;
