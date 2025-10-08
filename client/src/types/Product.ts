// src/types/Product.ts
export interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  quantity: number;
  createdAt: string; // ISO date string from MongoDB timestamp
}
