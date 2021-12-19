import React from 'react';
import { useEffect, useState, useContext, createContext } from 'react';
import axios from 'axios';
import {CoinList} from './config/api';
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from './firebase';
import { doc, setDoc, onSnapshot } from '@firebase/firestore';

const Crypto = createContext();

const CryptoContext = ({children}) => {
  const [currency, setCurrency] = useState('BTC')
  const [symbol, setSymbol] = useState('$')
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    type: 'success'
  });
  const [user, setUser] = useState(null);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, 'watchlist', user?.uid);

      var unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          console.log('COIN DATA COINS');
          console.log(coin.data().coins);
          setWatchlist(coin.data().coins);
        } else {
          console.log('No items in Watchlist');
        }
      });

      return () => {
        unsubscribe();
      }
    }
  }, [user]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });

  }, []);

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));

    setCoins(data);
    setLoading(false);
  }

  useEffect(() => {
    if (currency === 'USD') setSymbol('$');
    else if (currency === 'BTC') setSymbol('B');
  }, [currency]);
  // else if (currency === 'BTC') setSymbol("&#8383;");

  return (
      <Crypto.Provider
          value={{
            currency,
            setCurrency,
            symbol,
            alert,
            setAlert,
            user,
            coins,
            loading,
            watchlist,
            fetchCoins,
          }}
      >
        {children}
      </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
}