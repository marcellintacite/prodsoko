import { User } from "firebase/auth";
import {
  addDoc,
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  documentId,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "./firebase";
import { Product } from "@/types/product.model";
import { v4 as uuidv4 } from "uuid";
import { Order } from "@/types/orders.model";

// const shopCollection = collection(db, "shops");

export const addUser = (user: Partial<User>) => {
  const shopCollection = collection(db, "shops");
  const userRef = doc(shopCollection, user.uid);
  setDoc(userRef, user);
};

export const addProduct = (product: Partial<Product>) => {
  const uid = auth.currentUser?.uid;
  const id = uuidv4();
  const user = {
    uid: auth.currentUser?.uid,
    displayName: auth.currentUser?.displayName,
    email: auth.currentUser?.email,
    photo: auth.currentUser?.photoURL,
  };
  const collectionRef = collection(db, `shops/${uid}/products`);
  const docRef = doc(collectionRef, id);
  setDoc(docRef, { ...product, id: id, user }, { merge: true });
};

export const getProductByUser = async (uid: string) => {
  const collectionRef = collection(db, `shops/${uid}/products`);
  const q = query(collectionRef, orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  const products = querySnapshot.docs.map((doc) => doc.data());
  return products;
};

export const getAllProducts = async () => {
  const ref = collectionGroup(db, "products");
  const querySnapshot = await getDocs(ref);
  const products = querySnapshot.docs.map((doc) => doc.data());
  return products;
};

export const getTenFirstProduct = async () => {
  const ref = collectionGroup(db, "products");
  const q = query(ref, orderBy("createdAt", "desc"), limit(10));
  const querySnapshot = await getDocs(q);
  const products = querySnapshot.docs.map((doc) => doc.data());
  return products;
};

export const getProductById = async (id: string) => {
  const ref = collectionGroup(db, "products");
  const q = query(ref, where("id", "==", id), limit(1));
  const querySnapshot = await getDocs(q);
  const product = querySnapshot.docs.find((doc) => doc.id === id);
  return product?.data();
};

export const removeProduct = async (product: Product) => {
  const ref = doc(
    db,
    `shops/${product.user.uid as string}/products/${product.id}`
  );
  await deleteDoc(ref);
};

export const addOrderByUser = (order: Order) => {
  // order products by user
  order.products.forEach((p) => {
    const userUid = p.user.uid as string;
    const id = doc(collection(db, `shops/${userUid}/orders`)).id;
    const uniqueOrder: Order = {
      id,
      products: [p],
      createdAt: order.createdAt,
      user: order.user,
    };
    const ref = doc(db, `shops/${userUid}/orders/${id}`);

    setDoc(ref, uniqueOrder, { merge: true });
  });
};

export const getOrdersByUser = async (uid: string) => {
  const ref = collection(db, `shops/${uid}/orders`);
  const querySnapshot = await getDocs(ref);
  const orders = querySnapshot.docs.map((doc) => doc.data());
  return orders;
};
