import * as Dialog from '@radix-ui/react-dialog';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Product } from "@/Types/Product";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { Category } from "../CategoryBadge";
import { OpenImageModal } from "../OpenImageModal";
import { Card, CategoryWrapper, Image, ImageContainer, Info, Price, Title, EditMenu } from "./style";
import { useTranslation } from "react-i18next";
import { Content, Overlay } from '../Modal/styles';
import { DeleteButton, EditButton, ProductDropdownContent } from '../ProductDropdown/style';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';

interface ProductCardProps {
  children?: ReactNode;
  product: Product;
  deletableCategory?: boolean,
  onDelete?: ((id: number | undefined) => void) | null;
  isEditingImage?: boolean;
  setProductImageAndImageFile?: ((preview: string ,file?: File) => void) | null;
  canEditingProduct?: boolean;
}

export function ProductCard({ children = null, product, deletableCategory = false, onDelete = null, isEditingImage = false, setProductImageAndImageFile, canEditingProduct = false }: ProductCardProps) {
  const { t } = useTranslation();
  return (
    <Card>
      <ImageContainer>
        <Image src={product.image_url} />
        { isEditingImage && setProductImageAndImageFile ? <OpenImageModal setProductImageAndImageFile={setProductImageAndImageFile} /> : ''}
      </ImageContainer>
      {canEditingProduct && (
        <DropdownMenu.Root>
          <EditMenu>
            <DropdownMenu.Trigger>
              <BiDotsVerticalRounded />
            </DropdownMenu.Trigger>
          </EditMenu>

        <DropdownMenu.Portal>
          <ProductDropdownContent side="left" align="start">
          <Dialog.Root>
            <Dialog.Trigger>
              <EditButton>
                <FaPencilAlt /> Editar
              </EditButton>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Overlay>
                <Content>
                  Editar
                </Content>
              </Overlay>
            </Dialog.Portal>
          </Dialog.Root>
            <DeleteButton>
              <FaTrash />Excluir
            </DeleteButton>
          </ProductDropdownContent>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
      )}
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

{/* <Dialog.Root>
<Dialog.Trigger>
  <EditMenu>
    <BiDotsVerticalRounded />
  </EditMenu>
</Dialog.Trigger>
<Dialog.Portal>
  <Overlay>
    <Content>
      teste
    </Content>
  </Overlay>
</Dialog.Portal>
</Dialog.Root> */}