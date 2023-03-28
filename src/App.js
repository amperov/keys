import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Authorization from './components/Authorization';
import Client from './components/Client';
import Main from './components/Main';
import Product from './components/Product';
import Signup from './components/Signup';
import History from './components/History';
import Profile from './components/Profile';
import Keys from './components/Keys';
import Transaction from './components/Transaction';
import { Api } from './api/api';

function App() {
  const [ isAuthorized, setIsAuthorized ] = useState(false)

  useEffect(() => {
    document.title = 'plati.market';
    const token = localStorage.getItem('jwt')
    
    if (token) {
      Api.get('seller/me').then(r => setIsAuthorized(true)).catch(e => {
        setIsAuthorized(false)
        localStorage.removeItem('jwt')
        window.location.href = '/';
      })

    } else {
      setIsAuthorized(false)
    }

  }, [])


  return (
    <div className="App">
      { isAuthorized ? 
      
        <Routes>

          <Route path='/' element={<Main />} />
          <Route path='/:id/' element={<Product />} />
          <Route path='/:id/keys/:sid' element={<Keys />} />
          <Route path='/history/' element={<History />} />
          <Route path='/history/transaction/:id' element={<Transaction />} />
          <Route path='/profile/' element={<Profile />} />
          <Route path='/product/:username' element={<Client />} />
        
        </Routes>
        : 
        
        <Routes>

          <Route path='/signin' element={<Authorization />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/product/:username' element={<Client />} />
        
        </Routes>
      }

      {/* <Routes>

      <Route path='/seller/products/' element={<Main />} />
      <Route path='/seller/products/:id' element={<Product />} />
      <Route path='/profile/' element={<Profile />} />
      <Route path='/product' element={<Client />} />
      <Route path='/seller/history/' element={<History />} />


      </Routes> */}
    </div>
  );
}

export default App;
