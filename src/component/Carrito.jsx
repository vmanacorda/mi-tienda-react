
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { carritoContexto } from "./Carritocontext";

const Carrito = () => {
  const valor = useContext(carritoContexto);
  const { carrito, cantProd, totalPrecio, handleEliminar } = valor;

  const carritoVacio = carrito.length === 0;

  const navigate = useNavigate();

  const handleContinuarCompra = () => {
    if (!carrito.length) return; 
    navigate("/pago");
  };

  return (
    <div className="cart-page">
      <h1 className="cart-title">Carrito</h1>

      {carritoVacio ? (
        <p className="cart-empty">Tu carrito está vacío.</p>
      ) : (
        <div className="cart-layout">
          <section className="cart-items">
            {carrito.map((item) => (
              <article className="cart-item" key={item.id}>
                <div className="cart-item__info">
                  <h3 className="cart-item__title">{item.title}</h3>
                  <p className="cart-item__subtitle">
                    Unidad: <span>${item.price}</span>
                  </p>
                </div>

                <div className="cart-item__actions">
                  <span className="cart-item__price">${item.price}</span>
                  <button
                    className="cart-item__remove"
                    onClick={() => handleEliminar(item.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </article>
            ))}
          </section>

      
          <aside className="cart-summary">
            <h2 className="cart-summary__title">Resumen</h2>
            <p className="cart-summary__row">
              Productos: <span>{cantProd}</span>
            </p>
            <p className="cart-summary__row cart-summary__total">
              Total: <span>${totalPrecio}</span>
            </p>

            <button
              type="button"
              className="cart-summary__btn"
              onClick={handleContinuarCompra}
            >
              Continuar compra
            </button>
          </aside>
        </div>
      )}
    </div>
  );
};

export default Carrito;
