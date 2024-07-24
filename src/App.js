import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import CustomerTransactionDetail from './pages/CustomerTransactionDetail';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
            <Route index element={<Home />} />
            <Route path="transactionDetail/:id" element={<CustomerTransactionDetail />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
