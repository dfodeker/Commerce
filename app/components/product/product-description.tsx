import { AddToCart } from '../cart/add-to-cart';
import Price from '../price';
import Prose from '../prose';
import { Product } from '@lib/shopify/types';
import { VariantSelector } from './variant-selector';
import ProductRatings from './ratings';

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
     <br/>
     <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
              {product.descriptionHtml ? (
        <Prose
          className="text-base text-gray-900 leading-tight dark:text-white/[60%]"
          html={product.descriptionHtml}
        />
      ) : null}
              </div>
            </div>
            </div>
     

      
    </>
  );
}

export function VariantsPriceing({ product }: { product: Product }) {
  return(
    <>
     <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-4xl font-medium">{product.title}</h1>
        <div className=" pt-4 mr-auto w-auto text-2xl tracking-tight text-gray-900">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
        <ProductRatings/>
      </div>
      <VariantSelector options={product.options} variants={product.variants} />
      </>
  )

}