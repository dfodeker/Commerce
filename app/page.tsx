

import Products from './components/products'
import { ThreeItemGrid } from './components/grid/three-items'
import Nav from './components/nav'
import Image from 'next/image'
import { Suspense } from 'react'
import { Carousel } from './components/carousel'
import Hero from './components/hero'
import  FeaturedCollection  from './components/collections/featured'
import { getFeaturedCollection } from '@/lib/shopify'





export default function Home() {


  return (
    <>
    
      <div className='bg-white relative'>
        {/* Tree icons sprinkled around */}
        <section>
          <Suspense>
          <FeaturedCollection />
          </Suspense>
        
        </section>
        <section className='pt-5'>
          <Suspense>
        <Carousel/>

        </Suspense></section>
       

      </div>
    </>
  )
}

// <div className="flex flex-col md:flex-row z-10">
//           <Hero/>
//           <div className="md:w-1/2">
//             <img src="/gift-guide.gif" alt="Holiday Sales" className="w-full h-auto" />
//           </div>
//           <div className="md:w-1/2 flex items-center justify-center bg-slate-100">
//             <div className="m-8 text-center">
//             <div className="absolute top-20  opacity-75"><Image src="/tree.png" alt="Tree Icon" width={40} height={40} /></div>
//             <div className="absolute top-20 right-40 opacity-75"><Image src="/tree.png" alt="Tree Icon" width={40} height={40} /></div>
//               <h2 className="text-4xl font-bold mb-4">Gift Guides</h2>
//               <p className="mb-6">A collection of gifts that will have your loved ones saying, “best holiday season ever.”</p>
//               <button className="px-6  py-4 border rounded-xl text-xl  bg-red-600 text-white">Shop the Holiday Sale</button>
//             </div>
//           </div>
//         </div>