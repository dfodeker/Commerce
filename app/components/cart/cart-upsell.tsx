import { getCollectionProducts } from '@lib/shopify';
import type { Product } from '@lib/shopify/types';
function UpSellGrid(){
    //returns a grid of products that 
    return(
        <div>
            <h1>UpSellGrid</h1>
        </div>
    )
    
}
export default function CartUpsell(){
    const upsellProducts = getCollectionProducts({collection: 'upsell'})
    console.log(upsellProducts)
    return(
        <>
        <h1>upsell</h1>
        
        </>
           
    )
}