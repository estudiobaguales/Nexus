import { getProducts, getCollections, getCollectionProducts } from "@/lib/shopify"
import type { Product } from "@/lib/shopify/types"
import { ProductsPageClient } from "@/components/products-page-client"

export const metadata = {
  title: "Tienda | Nexus",
  description: "Equipamiento profesional de roundnet. Sets, pelotas, accesorios y mas.",
}

export default async function ProductosPage() {
  let products: Product[] = []

  try {
    const collections = await getCollections()
    if (collections.length > 0) {
      products = await getCollectionProducts({ collection: collections[0].handle, limit: 20 })
    }
    if (products.length === 0) {
      products = await getProducts({ first: 20 })
    }
  } catch {
    products = []
  }

  return <ProductsPageClient products={products} />
}
