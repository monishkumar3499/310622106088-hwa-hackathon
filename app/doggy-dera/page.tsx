import Link from "next/link"
import Image from "next/image"
import { ProductCustomizer } from "@/components/product-customizer"
import { getProduct } from "@/lib/products"

export default function DoggyDeraPage() {
  const product = getProduct("doggy-dera")

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-orange-500">Home</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{product?.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="flex flex-col gap-4">
          <div
            className="relative aspect-video rounded-2xl overflow-hidden border border-gray-200 bg-gray-100"
          >
            <Image
              src={product?.image ?? "/images/doggy-dera.jpg"}
              alt={product?.name ?? "Doggy Dera"}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {(product?.images ?? []).map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                className="w-full h-20 object-cover rounded-lg border border-gray-200 hover:border-orange-400 cursor-pointer transition"
              />
            ))}
          </div>
        </div>

        <ProductCustomizer product={product!} />
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Features</h2>
        <ul className="grid md:grid-cols-2 gap-4">
          {(product?.features ?? []).map((f, i) => (
            <li key={i} className="flex items-center gap-3 text-gray-700">
              <span className="text-orange-500">✓</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
