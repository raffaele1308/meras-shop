import Header from "@/components/Header";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: prodotto, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !prodotto) {
    notFound();
  }

  return (
    <>
      <Header />

      <main className="bg-white min-h-screen">

        <section className="max-w-6xl mx-auto px-6 py-12">

          <p className="text-sm text-gray-400">
            Home / {prodotto.category} / {prodotto.name}
          </p>

          <div className="grid lg:grid-cols-2 gap-12 mt-8">

            {/* FOTO */}

            <div>

              {prodotto.images?.[0] ? (

                <div className="relative rounded-3xl overflow-hidden h-[500px]">

                  <Image
                    src={prodotto.images[0]}
                    alt={prodotto.name}
                    fill
                    sizes="50vw"
                    className="object-cover"
                    priority
                  />

                </div>

              ) : (

                <div className="bg-[#f7f2ec] rounded-3xl h-[500px] flex items-center justify-center text-9xl">
                  👜
                </div>

              )}

              {prodotto.images?.length > 1 && (

                <div className="grid grid-cols-4 gap-4 mt-6">

                  {prodotto.images.map(
                    (image: string, index: number) => (

                      <div
                        key={index}
                        className="relative h-24 rounded-2xl overflow-hidden"
                      >

                        <Image
                          src={image}
                          alt={`${prodotto.name} ${index + 1}`}
                          fill
                          sizes="25vw"
                          className="object-cover"
                        />

                      </div>

                    )
                  )}

                </div>

              )}

            </div>

            {/* DETTAGLI */}

            <div>

              <h1 className="text-4xl font-serif">
                {prodotto.name}
              </h1>

              <p className="mt-8 text-gray-600 leading-8">
                {prodotto.description ||
                  "Nessuna descrizione disponibile."}
              </p>

              <p className="mt-10 text-3xl text-[#b98d63] font-semibold">

                {prodotto.price ||
                  "Contattami per il prezzo"}

              </p>

              <div className="mt-8 inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full">
                Disponibile
              </div>

              <div className="mt-10 p-6 border rounded-2xl bg-[#faf7f3]">

                <p className="font-medium">
                  Contattami per maggiori informazioni
                  o per il tuo ordine.
                </p>

              </div>

            </div>

          </div>

        </section>

      </main>
    </>
  );
}