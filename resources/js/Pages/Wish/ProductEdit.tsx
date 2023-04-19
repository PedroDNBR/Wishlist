import { Layout } from "@/Base/Layout";
import UpdateProduct from "@/Components/Forms/Product/UpdateProduct";
import { Category } from "@/Types/Category";
import { Product } from "@/Types/Product";
import { User } from "@/Types/User";
import { Head } from "@inertiajs/react";

interface UpdateProductProps {
  product: Product;
  errors: Record<string, string> | undefined | null;
  categories: Category[];
  auth: {
    user: User;
  }
}

export default function ProductEdit({ errors, categories, product, auth: { user } }: UpdateProductProps) {
  return (
    <>
      <Layout user={user}>
        <Head title="Edit Product"/>
        <UpdateProduct errors={errors} categories={categories} product={product} />
      </Layout>
    </>
  )
}