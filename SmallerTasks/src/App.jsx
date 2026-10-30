import Cart from './components/Cart'
import Cats from './components/Cats'
import { CartHandler } from './components/CartHandler';
import CurrencyConverter from './components/CurrencyConverter';
import PackingList from './components/PackingList';
import CountryList from './components/CountryList';
import SelectList from './components/SelectList';
import Counter from './components/Counter';
import BigForm from './components/BigForm';
import { useState } from 'react';
import PokemonAPI from './components/PokemonAPI';

const AppView = {
  Cart: 'Cart',
  PackingList: 'PackingList',
  CurrencyConverter: 'CurrencyConverter',
  SelectList: 'SelectList',
  CountryList: 'CountryList',
  Counter: 'Counter',
  BigForm: 'BigForm',
  Pokemon: 'Pokemon',
  Cats: 'Cats'
};

function App() {
  const [app,setApp] = useState(AppView.Cart);

  return (
    <>
      <label htmlFor="appSelect">
        Select your option: 
        <select id="appSelect" name="appSelect" value={app} onChange={e=>setApp(e.target.value)}>
          {Object.values(AppView).map(view => (
            <option key={view} value={view}>{view}</option>
          ))}
        </select>
      </label>

      {(() => {
        switch (app) {
          case AppView.Cart:
            return (
              <CartHandler>
                <Cart />
              </CartHandler>
            );  
          case AppView.PackingList:
            return <PackingList />;
          case AppView.CurrencyConverter:
            return <CurrencyConverter />;
          case AppView.SelectList:
            return <SelectList />;
          case AppView.CountryList:
            return <CountryList />;
          case AppView.Counter:
            return <Counter />;
          case AppView.BigForm:
            return <BigForm />;
          case AppView.Pokemon:
            return <PokemonAPI />;
          case AppView.Cats:
            return <Cats />;
          default:
            return null;
        }
      })()}
    </>
   
  )
}

export default App
