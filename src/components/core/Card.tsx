import {trucateText} from "../../utils/common";
import type { Product } from "../../types/product";

type CardProps = {
    product: Product;
}

//TODO Make it genaric card component
export default function Card({ product }: CardProps) {
  return (
    <div className="card">
      <h2 className="card-title">{product.title}</h2>
      <img className="card-image" src={product.thumbnail} alt={product.title} />
      <p className="card-description">{trucateText(product.description, 30)}</p>
      <p>Price: ${product.price}</p>
    </div>
  )
}