import Link from "next/link";
import Header from "@/components/Header";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Header />

      <main className="bg-[#faf8f5] min-h-screen">

        {/* HERO */}

<section className="max-w-7xl mx-auto px-4 mt-4">

  <div className="bg-[#f7f2ec] rounded-2xl overflow-hidden">

    <div className="grid lg:grid-cols-2 items-center">

      <div className="px-10 lg:px-14 py-10 lg:py-12">

        <h1 className="text-[48px] lg:text-[58px] font-serif text-gray-800 leading-[1.15]">
          Dettagli che fanno
          <br />
          la differenza.
        </h1>

        <p className="mt-8 text-gray-600 leading-8 max-w-sm">
          Una selezione di articoli scelti
          con cura per la tua casa e il tuo stile.
        </p>

        <button className="mt-10 bg-[#c7a384] text-white px-7 py-3 rounded-md tracking-[0.12em] text-[12px] hover:opacity-90 transition">
          SCOPRI LE COLLEZIONI
        </button>

      </div>

      <div className="relative h-[380px] lg:h-[450px]">

        <Image
          src="/hero-bag-v2.jpg"
          alt="Hero"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          priority
        />

      </div>

    </div>

  </div>

</section>

        {/* CATEGORIE */}

        <section className="max-w-7xl mx-auto px-4 py-16">

          <div className="text-center mb-12">

            <h2 className="text-2xl font-serif tracking-wide">
              LE NOSTRE CATEGORIE
            </h2>

            <div className="flex justify-center items-center gap-4 mt-4">

              <div className="w-12 h-px bg-[#c7a384]" />

              <span className="text-[#c7a384]">
                ♡
              </span>

              <div className="w-12 h-px bg-[#c7a384]" />

            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-6 pb-10">

            {/* BORSE */}

            <Link href="/borse">

              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer">

                <div className="relative aspect-[16/9]">

  <Image
    src="/category-borse.jpg"
    alt="Borse"
    fill
    sizes="(max-width: 768px) 100vw, 50vw"
    className="object-cover"
  />

</div>

                <div className="p-4 text-center">

                  <h3 className="text-2xl font-serif">
  BORSE
</h3>

                  <p className="mt-2 text-gray-500">
                    Scopri la collezione
                  </p>

                </div>

              </div>

            </Link>

            {/* CASA */}

            <Link href="/casa">

              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer">

                <div className="relative aspect-[16/9]">

                  <Image
                    src="/category-casa.jpg"
                    alt="Casa"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />

                </div>

                <div className="p-4 text-center">

                  <h3 className="text-2xl font-serif">
  CASA
</h3>

                  <p className="mt-2 text-gray-500">
                    Scopri la collezione
                  </p>

                </div>

              </div>

            </Link>

          </div>

        </section>

      </main>
    </>
  );
}