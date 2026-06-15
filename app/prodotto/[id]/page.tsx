"use client";

import Header from "@/components/Header";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

export default function ProductPage() {
  const params = useParams();

  const [loading, setLoading] = useState(true);
  const [prodotto, setProdotto] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [mainSwiper, setMainSwiper] = useState<any>(null);

  useEffect(() => {
    async function loadProduct() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", params.id)
        .single();

      if (error || !data) {
        notFound();
        return;
      }

      setProdotto(data);
      setLoading(false);
    }

    loadProduct();
  }, [params.id]);

  if (loading) {
    return (
      <>
        <Header />

        <main className="bg-white min-h-screen flex items-center justify-center">
          Caricamento...
        </main>
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="bg-white min-h-screen">

        <section className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">

          <p className="text-sm text-gray-400">
            Home / {prodotto.category} / {prodotto.name}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">

  <div>

  {prodotto.images?.length > 0 ? (

    <>

      <Swiper
        modules={[Navigation]}
        navigation
                onSwiper={setMainSwiper}
        onSlideChange={(swiper) =>
          setSelectedImage(swiper.activeIndex)
        }
        className="rounded-3xl overflow-hidden"
      >

        {prodotto.images.map(
          (image: string, index: number) => (

            <SwiperSlide key={index}>

              <img
                src={image}
                alt={`${prodotto.name} ${index + 1}`}
                className="w-full h-[350px] md:h-[500px] object-cover"
              />

            </SwiperSlide>

          )
        )}

      </Swiper>

      {prodotto.images.length > 1 && (

        <div className="grid grid-cols-4 gap-4 mt-6">

          {prodotto.images.map(
            (image: string, index: number) => (

              <button
                key={index}
                type="button"
                onClick={() => {
  setSelectedImage(index);
  mainSwiper?.slideTo(index);
}}
                className={`overflow-hidden rounded-2xl border-2 transition ${
                  selectedImage === index
                    ? "border-[#c7a384]"
                    : "border-transparent"
                }`}
              >

                <img
                  src={image}
                  alt={`${prodotto.name} ${index + 1}`}
                  className="w-full h-24 object-cover"
                />

              </button>

            )
          )}

        </div>

      )}

    </>

  ) : (

    <div className="bg-[#f7f2ec] rounded-3xl h-[350px] md:h-[500px] flex items-center justify-center text-9xl">
      👜
    </div>

  )}

</div>

            {/* DETTAGLI */}

            <div>

              <h1 className="text-3xl md:text-4xl font-serif">
                {prodotto.name}
              </h1>

              <p className="mt-8 text-gray-600 leading-8">
                {prodotto.description ||
                  "Nessuna descrizione disponibile."}
              </p>

              <p className="mt-8 text-2xl md:text-3xl text-[#b98d63] font-semibold">

                {prodotto.price ||
                  "Contattami per il prezzo"}

              </p>

              <div className="mt-8 inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full">
                Disponibile
              </div>

              <div className="mt-8 p-4 md:p-6 border rounded-2xl bg-[#faf7f3]">

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
