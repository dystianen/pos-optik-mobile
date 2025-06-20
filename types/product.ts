import { GeneralResponse } from "./general";

export type TProduct = {
  product_id: number;
  category_id: string;
  product_name: string;
  product_price: string;
  product_stock: string;
  product_brand: string;
  product_image_url: string;
  model: string;
  duration: string;
  material: string;
  base_curve: string;
  diameter: string;
  power_range: string;
  water_content: string;
  uv_protection: string;
  color: string;
  coating: string;
  created_at: Date;
  updated_at: Date;
  score: number;
};

export type TResProduct = GeneralResponse<TProduct>;
export type TResProducts = GeneralResponse<TProduct[]>;

export type TCategory = {
  category_id: string;
  category_name: string;
  category_description: string;
};
export type TResCategories = GeneralResponse<TCategory[]>;
