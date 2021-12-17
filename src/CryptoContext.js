import React from 'react';
import { useEffect, useState, useContext, createContext } from 'react';

const Crypto = createContext();

const CryptoContext = ({children}) => {
  const [currency, setCurrency] = useState('USD')
  const [symbol, setSymbol] = useState('$')

  useEffect(() => {
    if (currency === 'USD') setSymbol('$');
    else if (currency === 'BTC') setSymbol('&#8383;');
  }, [currency]);

  return (
      <Crypto.Provider value={{currency, symbol, setCurrency}}>
        {children}
      </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
}