import { GridTileImage } from "@components/grid/tile";
import { getProduct, getProductRecommendations } from "@/lib/shopify";
import { Gallery } from "@components/product/gallery";
import Link from "next/link";
import { notFound, usePathname } from "next/navigation";
import { Suspense } from "react";
import { ProductDescription,  VariantsPricing } from "@components/product/product-description";
import { Image } from "@/lib/shopify/types";
import NewPoductPage from "@/app/components/product-page";
import { AddToCart } from "@/app/components/cart/add-to-cart";


interface Product{
    id: number;
    handle: string;
    title: string;
    imageSrc: string;
    imageAlt: string;
    price:string;
    color: string;
}


interface Props{
    params: {slug: string};
}

export  async function Product({params}: Props){
    const products: Product[]= await fetch('http://localhost:3001/api/content').then(res => res.json())

    const product = products.find(product => product.handle === params.slug)!
  
    return(
        <div>
            <h1>{product.title}</h1>
            
            <p>{product.price}</p>
            
        </div>
    )
}

export default async function ProductPage({ params }: { params: { handle: string } }) {
  
  const product = await getProduct(params.handle);
  console.log(product)
    if (!product) return notFound();
  
    const productJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.title,
      description: product.description,
      image: product.featuredImage.url,
      offers: {
        '@type': 'AggregateOffer',
        availability: product.availableForSale
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
        priceCurrency: product.priceRange.minVariantPrice.currencyCode,
        highPrice: product.priceRange.maxVariantPrice.amount,
        lowPrice: product.priceRange.minVariantPrice.amount
      }
    };
    //<NewPoductPage/>
    // we need to display selected variant images



  
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productJsonLd)
          }}
        />
        
        
        <div className="mx-auto max-w-screen-2xl px-4 bg-white">
          <div className="flex flex-col  bg-white p-8 dark:border-neutral-800 dark:bg-black md:p-12 lg:flex-row lg:gap-8">
            <div className="h-full w-full basis-full lg:basis-4/6">
              <Gallery
                images={product.images.map((image: Image) => ({
                  src: image.url,
                  altText: image.altText
                }))}
              />
               <ProductDescription product={product} />
            </div>
  
            <div className="basis-full lg:basis-2/6">
              <VariantsPricing product={product} />

              <AddToCart variants={product.variants} availableForSale={product.availableForSale} />
            </div>
          </div>
          <Suspense>
            <RelatedProducts id={product.id} />
          </Suspense>
        </div>
        
      </>
    );
  }
  
  async function RelatedProducts({ id }: { id: string }) {
    const relatedProducts = await getProductRecommendations(id);
  
    if (!relatedProducts.length) return null;
  
    return (
      <div className="py-8">
        <h2 className="mb-4 text-2xl font-bold">Related Products</h2>
        <ul className="flex w-full gap-4 overflow-x-auto pt-1">
          {relatedProducts.map((product) => (
            <li
              key={product.handle}
              className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
            >
              <Link className="relative h-full w-full" href={`/products/${product.handle}`}>
                <GridTileImage
                  alt={product.title}
                  label={{
                    title: product.title,
                    amount: product.priceRange.maxVariantPrice.amount,
                    currencyCode: product.priceRange.maxVariantPrice.currencyCode
                  }}
                  src={product.featuredImage?.url}
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>

    );
  }