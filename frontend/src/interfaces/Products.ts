import { Categories } from "./Categories";
import { Suppliers } from "./Suppliers";

export interface Products {
  product_id: number;
  product_name: string;
  description: string;
  price: number;
  stock_quantity: number;
  category: Categories;
  sku: string;
  image_url: string;
  supplier: Suppliers;
  created_at: string;
  updated_at: string;
}
