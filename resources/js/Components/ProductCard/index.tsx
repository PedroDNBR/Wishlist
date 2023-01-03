import { Product } from "@/Types/Product";
import { ReactNode } from "react";
import { Category } from "../CategoryBadge";
import { OpenImageModal } from "../OpenImageModal";
import { Card, CategoryWrapper, Image, ImageContainer, Info, Price, Title } from "./style";
import { useTranslation } from "react-i18next";

interface ProductCardProps {
  children?: ReactNode;
  product: Product;
  deletableCategory?: boolean,
  onDelete?: ((id: number | undefined) => void) | null;
  isEditing?: boolean;
}

export function ProductCard({ children = null, product, deletableCategory = false, onDelete = null, isEditing = false }: ProductCardProps) {
  const { t } = useTranslation();
  return (
    <Card>
      <ImageContainer>
        <Image src={product.image_url} />
        { isEditing ? <OpenImageModal /> : ''}
      </ImageContainer>
      <Info>
        <Title><a href={product?.url} target="_blank">{product.name}</a></Title>
        <Price>{t('labels:lowest-price')}: R$ {product.lowest_price}</Price>
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
