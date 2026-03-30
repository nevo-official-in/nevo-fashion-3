import { db } from '../firebase';
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';

const productsCollectionRef = collection(db, 'products');

export const getProducts = async () => {
  const data = await getDocs(productsCollectionRef);
  return data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

export const getProduct = async (id) => {
  const productDoc = doc(db, 'products', id);
  const product = await getDoc(productDoc);
  return product.exists() ? { ...product.data(), id: product.id } : null;
};
