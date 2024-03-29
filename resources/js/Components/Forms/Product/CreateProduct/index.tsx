import { Layout } from "@/Base/Layout";
import { ButtonComponent } from "@/Components/Button";
import { FormLayout, Container } from "@/Components/CategoryForm/styles";
import { InputControlled } from "@/Components/Input";
import { ProductCard } from "@/Components/ProductCard";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import axios from "axios";
import { router } from '@inertiajs/react';
import { useFormErrors } from "@/Hooks/useFormErrors";
import { Category } from "@/Types/Category";
import { Product } from "@/Types/Product";
import { useTranslation } from "react-i18next";
import { ReactSelectControlled } from "@/Components/ReactSelectControlled";


interface CreateProductProps {
  errors: Record<string, string> | undefined | null;
  categories: Category[];
}

export default function CreateProduct({ errors, categories }: CreateProductProps) {
  const {
    control,
    setError,
    setValue,
    handleSubmit
  } = useForm();

  const { t } = useTranslation();

  const { handleErrors } = useFormErrors({errors, setError, enabled: false});
  
  useEffect(() => {
    if (!errors) return;

    handleErrors();
  }, [errors])

  const placeholderImage = "https://lolitajoias.com.br/wp-content/uploads/2020/09/no-image.jpg"

  const [productCategories, setProductCategories] = useState<Category[]>([]);
  const [productImage, setProductImage] = useState<string>(placeholderImage);
  const [productImageFile, setProductImageFile] = useState<File | undefined>(undefined);

  const defaultProduct = {
    name: t('labels:favorite-product'),
    lowest_price: 3000,
    image_url: productImage,
    categories: productCategories,
    url: '',
  } as Product;
  
  const [product, setProduct] = useState<Product>(defaultProduct);

  const productName = useWatch({
    control,
    name: "name",
  });

  const productPrice = useWatch({
    control,
    name: "lowest_price",
  });

  const productUrl = useWatch({
    control,
    name: "url",
  });

  useEffect(() => {
    if (!productPrice) return;
    formatPrice(productPrice);
  }, [productPrice]);
  function formatPrice(productPrice: string)  {
    let price = productPrice ?? '';
    price = price.replace(/\D/g, "");
    price = price.replace(/(\d)(\d{2})$/, "$1.$2");
    price = price.replace(/(?=(\d{3})+(\D))\B/g, ",");
    setValue('lowest_price', price);
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (productUrl) getImage();
    }, 1500)

    return () => clearTimeout(delayDebounceFn)
  }, [productUrl])

  async function getImage() {
    if (!productUrl) return;
    try {
      const response = await axios.post('/api/image', { url: productUrl });
      if(response.data)
        setProductImage(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  function defineProduct() {
    const newProduct = {
      name: productName ?? t('labels:favorite-product'),
      lowest_price: productPrice ?? 3000,
      url: productUrl,
      image_url: productImage,
      categories: productCategories
    };
    setProduct(newProduct);
  }

  useEffect(() => {
    defineProduct();
  }, [productName, productPrice, productCategories, productImage]);

  function deleteCategory(id?: number) {
    const newItems = productCategories.filter((category: Category) => category.id !== id);
    setProductCategories(newItems);
  }

  function setProductImageAndImageFile(preview: string, file?: File) {
    setProductImageFile(file);
    setProductImage(preview);
  }

  const categoriesSelect = () => {
    return categories.filter(category => !productCategories.includes(category)).map((category: Category) => {
      return {
        id: category.id,
        value: category.id,
        name: category.name,
        label: category.name,
        color: category.color,
      };
    });
  }

  async function sendProduct(data: any) {
    const productToSend = {
      name: productName,
      lowest_price: productPrice,
      url: productUrl,
      image_url: productImage,
      categories: productCategories
    };
    let response;
    if(productImageFile) {
      const formData = new FormData();
      formData.append("file", productImageFile);
      response = await axios.post('/api/store-image', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
      setProductImage(response.data.location)
        await router.post('/product', {...productToSend, image_url: response?.data.location } as any, {
          headers: {
            'Content-Language': localStorage.getItem('i18nextLng') ?? 'en',
          },
        });
    } else {
        await router.post('/product', productToSend as any, {
          headers: {
            'Content-Language': localStorage.getItem('i18nextLng') ?? 'en',
          },
        });
    }
    // reset();
  }

  return (
    <>
        <FormLayout>
          <ProductCard product={product} onDelete={deleteCategory} isEditingImage={true} setProductImageAndImageFile={setProductImageAndImageFile}>
          </ProductCard>
          <Container>
            <form onSubmit={handleSubmit(sendProduct)}>
              <InputControlled control={control} label={t('inputs:name')} type="text" name="name" max={255} />
              <InputControlled control={control} label={t('inputs:url')} type="text" name="url" onPaste={getImage} />
              <InputControlled control={control} label={t('inputs:lowest-price')} type="text" max={10} name="lowest_price" />
              <ReactSelectControlled control={control} placeHolder={t('inputs:select-categories')} label={t('inputs:categories')} name="categories" setValue={setProductCategories} options={categoriesSelect} isOptionDisabled={() => productCategories.length > 3} selected={[]} />
              <ButtonComponent name={t('inputs:create')} />
            </form>
          </Container>
        </FormLayout>
    </>
  )
}