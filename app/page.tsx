import { getProducts, getCollectionProducts, getCollections } from "@/lib/shopify"
import type { Product } from "@/lib/shopify/types"
import { HomeClient } from "@/components/home-client"

export default async function Home() {
  let products: Product[] = []

  try {
    const collections = await getCollections()
    if (collections.length > 0) {
      products = await getCollectionProducts({
        collection: collections[0].handle,
      })
    }

    if (products.length === 0) {
      products = await getProducts({})
    }
  } catch (error) {
    console.error("Error fetching products:", error)
    products = []
  }

  return <HomeClient products={products} />
}
