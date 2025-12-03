
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseconfig";
import Item from "./Item";

const ItemListContainer = () => {
  const { id } = useParams(); 

  const [resultado, setResultado] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setCargando(true);
        setError(null);

        const productosRef = collection(db, "productos");

        
        let q;
        if (id) {
          q = query(productosRef, where("category", "==", id));
        } else {
          q = productosRef;
        }

        const snapshot = await getDocs(q);

        if (snapshot.empty) {
          setResultado([]);
          return;
        }

        const products = snapshot.docs.map((doc) => ({
          ...doc.data(),
        }));

        setResultado(products);
      } catch (err) {
        console.error("Error leyendo Firestore:", err);
        setError("Ocurrió un error al cargar los productos.");
      } finally {
        setCargando(false);
      }
    };

    fetchProducts();
  }, [id]);

  if (cargando) {
    return <p style={{ padding: "2rem" }}>Cargando productos...</p>;
  }

  if (error) {
    return <p style={{ padding: "2rem" }}>{error}</p>;
  }

  if (!resultado.length) {
    return (
      <p style={{ padding: "2rem" }}>
        No hay productos para mostrar en esta categoría.
      </p>
    );
  }

  return (
    <div className="grid-productos">
      {resultado.map((prod) => (
        <Item key={prod.id} {...prod} variant="list" />
      ))}
    </div>
  );
};

export default ItemListContainer;
