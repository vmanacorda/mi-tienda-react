
import { Link } from "react-router-dom";
import { useContext } from "react";
import { carritoContexto } from "./Carritocontext";

const Item = ({ id, title, price, thumbnail, variant = "list" }) => {
  const { handleAgregar } = useContext(carritoContexto);

  if (!title) return null;

  const handleAddToCart = () => {
    handleAgregar({
      id,
      title,
      price,
      thumbnail,
      quantity: 1,
    });
  };

  return (
    <article className="product-card">
      <div className="product-card__image">
        <img src={thumbnail} alt={title} className="product-card__img" />
      </div>

      <div className="product-card__info">
        <h3 className="product-card__title">{title}</h3>
        <p className="product-card__description">Producto seleccionado</p>

        <div className="product-card__footer">
          <span className="product-card__price">${price}</span>

          
          {variant === "list" && (
            <Link to={`/producto/${id}`} className="product-card__btn">
              Ver detalle
            </Link>
          )}

        
          {variant === "detail" && (
            <button
              type="button"
              className="product-card__btn"
              onClick={handleAddToCart}
            >
              Agregar al carrito
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default Item;
