import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Header, Banner } from './components';
import { CoinPage, HomePage } from './Pages';
import { makeStyles } from '@material-ui/core';

function App() {

  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor:  '#14161A',
      color: 'white',
      minHeight: '100vh'
    }
  }));

  const classes = useStyles();

  return (
      <BrowserRouter>
        <div className={classes.App}>
          <Header />
          <Routes>
            <Route path='/' element={<HomePage />} exact />
            <Route path='/coins/:id' element={<CoinPage />} />
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;

/*
 MY NOTES:
  - If I create Layouts, I wrap each Route with the layout tag I create
 */