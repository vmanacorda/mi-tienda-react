
import { Routes, Route } from "react-router-dom";
import Footer from "./Footer";
import { Principal } from "./Principal";
import Carrito from "./Carrito";
import CartWidget from "./CartWidget";
import ItemListContainer from "./ItemListContainer";
import ProductDetailContainer from "./ProductDetailContainer";
import CarritoProvider from "./Carritocontext";
import { Toaster } from "react-hot-toast";
import Pago from "./Pago";

const App = () => {
  return (
    <CarritoProvider>
      <Principal>
        <CartWidget />
      </Principal>

      
      <div className="main-content">
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/categorias/:id" element={<ItemListContainer />} />
          <Route path="/producto/:id" element={<ProductDetailContainer />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/pago" element={<Pago />} />
        </Routes>
      </div>

      <Footer />
      <Toaster />
    </CarritoProvider>
  );
};

export default App;
