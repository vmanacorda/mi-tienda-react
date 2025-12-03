import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebaseconfig";
import Item from "./Item";

const ProductDetailContainer = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setCargando(true);
        setError(null);

        const productosRef = collection(db, "productos");

     
        const q = query(productosRef, where("id", "==", Number(id)));

        const snapshot = await getDocs(q);

        if (snapshot.empty) {
          setError("No se encontró el producto.");
          setProduct(null);
          return;
        }

        const docData = snapshot.docs[0].data();

        setProduct({ ...docData });
      } catch (err) {
        console.error("Error leyendo producto:", err);
        setError("Ocurrió un error al cargar el producto.");
      } finally {
        setCargando(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (cargando) {
    return <p style={{ padding: "2rem" }}>Cargando producto...</p>;
  }

  if (error) {
    return <p style={{ padding: "2rem" }}>{error}</p>;
  }

  if (!product) return null;

return (
  <div style={{ padding: "2rem" }}>
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <Item {...product} variant="detail" />
    </div>
  </div>
);

};

export default ProductDetailContainer;
