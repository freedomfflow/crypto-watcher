import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import { SingleCoin } from '../config/api';
import {
  Button,
  LinearProgress,
  makeStyles,
  Typography
} from '@material-ui/core';
import { CoinInfo} from '../components';
import {numberWithCommas} from '../components/Banner/Carousel';
import { doc, setDoc } from '@firebase/firestore';
import { db } from '../firebase';
// import ReactHtmlParser from 'react-html-parser';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  sidebar: {
    width: '30%',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 25,
    borderRight: '2px solid grey'
  },
  heading: {
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Montserrat'
  },
  description: {
    width: '100%',
    fontFamily: 'Montserrat',
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: 'justify'
  },
  marketData: {
    slignSelf: 'start',
    padding: 25,
    paddingTop: 10,
    width: '100%',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      justifyContent: 'space-around'
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center'
    },
    [theme.breakpoints.down('xs')]: {
      alignItems: 'start'
    },
  }
}));

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol, user, watchlist, setAlert } = CryptoState();

  const classes = useStyles();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  const inWatchlist = watchlist.includes(coin?.id);

  const addToWatchlist = async () => {
    const coinRef = doc(db, 'watchlist', user.uid);
    try {
      await setDoc(coinRef, {
        coins: watchlist ? [...watchlist, coin?.id] : [coin?.id],
      });

      setAlert({
        open: true,
        message: `${coin.name} added to your watch list`,
        type: 'success',
      })
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: 'error',
      })
    }
  }

  const removeFromWatchlist = async (coin) => {
    const coinRef = doc(db, 'watchlist', user.uid);
    try {
      await setDoc(
          coinRef,
          {
                coins: watchlist.filter((wish) => wish !== coin?.id)
          },
          {merge: 'true'}
      );

      setAlert({
        open: true,
        message: `${coin.name} removed from your watch list`,
        type: 'success',
      })
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: 'error',
      })
    }
  }

  useEffect(() => {
    fetchCoin();
  }, []);

  if (!coin) return <LinearProgress style={{ backgroundColor: 'gold'}} />;

  return (
      <div className={classes.container}>
        <div className={classes.sidebar}>
          <img
            src = {coin?.image.large}
            alt = {coin?.name}
            height = '200'
            style = {{ marginBottom: 20 }}
          />
          <Typography
            variant='h3'
            className={classes.heading}
          >
            {coin?.name}
          </Typography>
          <Typography
            variant='subtitle1'
            className={classes.description}
          >
            {coin?.description.en.split('. ')[0]}.
            {/*{ReactHtmlParser(coin?.description.en.split('. ')[0])}.*/}
          </Typography>
          <div className={classes.marketData}>
            <span
              style={{ display: 'flex'}}>
              <Typography
                variant='h5'
                className={classes.heading}
              >
                Rank
              </Typography>
              &nbsp;&nbsp;
              <Typography
                variant='h5'
                style={{
                  fontFamily: 'Montserrat',
                }}
              >
                {coin?.market_cap_rank}
              </Typography>
            </span>
            <span
                style={{ display: 'flex'}}>
              <Typography
                  variant='h5'
                  className={classes.heading}
              >
                Current Price:
              </Typography>
              &nbsp;&nbsp;
              <Typography
                  variant='h5'
                  style={{
                    fontFamily: 'Montserrat',
                  }}
              >
                {symbol}{' '}
                {numberWithCommas(
                    coin?.market_data.current_price[currency.toLowerCase()]
                )}
              </Typography>
            </span>
            <span
                style={{ display: 'flex'}}>
              <Typography
                  variant='h5'
                  className={classes.heading}
              >
                Market Cap
              </Typography>
              &nbsp;&nbsp;
              <Typography
                  variant='h5'
                  style={{
                    fontFamily: 'Montserrat',
                  }}
              >
                {symbol}{' '}
                {numberWithCommas(
                    coin?.market_data.market_cap[currency.toLowerCase()]
                        .toString()
                        .slice(0, -6)
                )}
                &nbsp;M
              </Typography>
            </span>

            {user && (
                <Button
                  variant='contained'
                  style={{
                    width: '100%',
                    height: 40,
                    backgroundColor: inWatchlist ? 'red' : '#EEBC1D'
                  }}
                  onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
                >
                  {inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
                </Button>
            )}
          </div>
        </div>
        {/* chart */}
        <CoinInfo coin={coin} />
      </div>
  );
};

export default CoinPage;
