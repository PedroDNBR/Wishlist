import { Product } from "@/Types/Product";
import { ReactNode } from "react";
import { Category } from "../CategoryBadge";
import { Card, CategoryWrapper, Image, ImageContainer, Info, Price, Title } from "./style";

interface ProductCardProps {
  children?: ReactNode;
  product: Product;
  deletableCategory?: boolean,
  onDelete?: ((id: number | undefined) => void) | null;
}

export function ProductCard({ children = null, product, deletableCategory = false, onDelete = null }: ProductCardProps) {
  return (
    <Card>
      <ImageContainer>
        <Image src={product.image_url} />
      </ImageContainer>
      <Info>
        <Title><a href={product?.url} target="_blank">{product.name}</a></Title>
        <Price>R$ {product.lowest_price}</Price>
        <CategoryWrapper>
          {product?.categories?.map((category) => (
            <Category category={category} canDelete={deletableCategory} key={category.id ? category.id : "1"} onDelete={onDelete} />
          ))}
          {children}
        </CategoryWrapper>
      </Info>
    </Card>
  )
}
