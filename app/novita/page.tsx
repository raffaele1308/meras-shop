import Header from "@/components/Header";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export default async function NovitaPage() {
  const { data: prodotti, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_new", true)
    .eq("is_visible", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
  }

  return (
    <>
      <Header />

      <main className="bg-white min-h-screen">

        <section className="max-w-6xl mx-auto px-6 py-12">

          <p className="text-sm text-gray-400">
            Home / Novità
          </p>

          <div className="mt-4">

            <h1 className="text-4xl font-serif">
              ✨ NOVITÀ
            </h1>

            <div className="w-12 h-1 bg-[#c8a98c] mt-3 rounded-full" />

            <p className="text-gray-600 mt-6">
              Scopri gli ultimi articoli aggiunti.
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">

            {prodotti?.map((prodotto) => (

              <Link
                href={`/prodotto/${prodotto.id}`}
                key={prodotto.id}
              >

                <div className="group border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">

                  <div className="relative h-72 overflow-hidden bg-[#f7f2ec]">

                    {prodotto.images?.[0] ? (

                      <Image
                        src={prodotto.images[0]}
                        alt={prodotto.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                    ) : (

                      <div className="h-full flex items-center justify-center">

                        <span className="text-7xl">
                          ✨
                        </span>

                      </div>

                    )}

                  </div>

                  <div className="p-6">

                    <h2 className="text-lg font-semibold">
                      {prodotto.name}
                    </h2>

                    <p className="text-sm text-gray-500 mt-2">
                      Ultimo prodotto inserito.
                    </p>

                    <p className="mt-4 text-[#b98d63] font-medium">

                      {prodotto.price
                        ? prodotto.price
                        : "Contattami per il prezzo"}

                    </p>

                  </div>

                </div>

              </Link>

            ))}

          </div>

          {prodotti?.length === 0 && (

            <div className="text-center py-20">

              <p className="text-gray-500">
                Nessuna novità disponibile al momento.
              </p>

            </div>

          )}

        </section>

      </main>
    </>
  );
}