// app/product/[id]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import AddToCartButton from "@/app/AddToCartButton";
import { type Metadata } from "next";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
};

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  return {
    title: `Product ${props.params.id}`,
  };
}

export default async function ProductPage(props: Props) {
  const { id } = props.params;

  const res = await fetch(`https://fakestoreapi.com/products/${id}`);

  if (!res.ok) return notFound();

  const product: Product = await res.json();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Image
          src={product.image}
          alt={product.title}
          width={400}
          height={400}
          className="object-contain w-full h-auto rounded"
        />
        <div>
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            <p className="text-gray-500 text-sm mb-2 capitalize">{product.category}</p>
            <p className="text-xl font-semibold text-green-600 mb-4">${product.price}</p>
            <p className="text-gray-700 mb-6">{product.description}</p>
            <AddToCartButton
                product={{
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                    quantity: 1,
                }}
            />
        </div>
      </div>
    </div>
  );
}
