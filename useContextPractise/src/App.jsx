import Cart from './components/Cart'
import { CartHandler } from './components/CartHandler';
import CurrencyConverter from './components/CurrencyConverter';
import PackingList from './components/PackingList';
import CountryList from './components/CountryList';
import SelectList from './components/SelectList';
import Counter from './components/Counter';
import BigForm from './components/BigForm';

function App() {

  return (
    <div>
      <CartHandler>
        <Cart />
      </CartHandler>
      ---------------------------------------
      <PackingList />
      -------------------------------------
      <CurrencyConverter/>
      ---------------------------------------
      <CountryList />
      ---------------------------------------
      <Counter />
      ---------------------------------------
      <SelectList />
      ---------------------------------------
      <BigForm />
    </div>
  )
}

export default App
