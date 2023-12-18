//
const products = [
    {
        id: 1,
        handle: 'basic-tee',
        title: 'Basic Tee',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
    },
    {
        id: 2,
        handle: 'classic-hoodie',
        title: 'Classic Hoodie',
        imageSrc: 'https://images.unsplash.com/photo-1614358536373-1ce27819009e?q=80&w=2969&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        imageAlt: "Front of men's Classic Hoodie in gray.",
        price: '$50',
        color: 'Gray',
    },
    {
        id: 3,
        handle: 'ocean-board',
        title: 'Ocean Board',
        imageSrc: 'https://images.unsplash.com/photo-1518608774889-b04d2abe7702?q=80&w=3212&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        imageAlt: "Ocean board in blue.",
        price: '$60',
        color: 'Blue',
    }
];

import { NextResponse } from "next/server"

const key = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN;
const endpoint = `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/${process.env.SHOPIFY_API_VERSION}/graphql.json`;
export async function GET() {
    console.log('the store key',key)
    console.log('the endpoint',endpoint)
    return NextResponse.json(products);
}

