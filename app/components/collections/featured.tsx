import Link from "next/link"
import Image from "next/image"
import { getFeaturedCollection } from "@/lib/shopify"
import { ShopifyFeaturedCollection } from "@/lib/shopify/types"
import { Button } from "@components/ui/button"



export default async function FeaturedCollection() {
    const collection: ShopifyFeaturedCollection = await getFeaturedCollection()

    if (!collection ) return null
    console.log(collection)
    const image = collection?.image
    const halfHeight = image.height / 2
    return (<>
<Link href={`/collections/${collection.handle}`}>
    <div className="relative   h-[800px] bg-cover bg-no-repeat bg-center w-full" style={ {backgroundImage:`url(${image.url})`}}>
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
          
          {/* Label indicating this is a featured post */}
          <div className="absolute bottom-0 mb-24 p-4 text-xs uppercase tracking-wide font-bold text-white">Featured</div>
          
          {/* Title */}
          <h2 className="absolute bottom-0 mb-16 p-4 text-3xl font-semibold text-white">{collection.title}</h2>
          <div className="absolute bottom-0 mb-8 p-4 text-lg font-semibold pt-2">
            <Button variant="outline">Shop Now</Button>
          </div>

    </div>


</Link>

        
            </>
    )
    
}