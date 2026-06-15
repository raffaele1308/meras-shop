"use client";

import Header from "@/components/Header";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

export default function ProductPage() {
  const params = useParams();

  const [loading, setLoading] = useState(true);
  const [prodotto, setProdotto] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

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

        <section className="max-w-6xl mx-auto px-6 py-12">

          <p className="text-sm text-gray-400">
            Home / {prodotto.category} / {prodotto.name}
          </p>

          <div className="grid lg:grid-cols-2 gap-12 mt-8">

           {/* FOTO */}

<div>

  {prodotto.images?.length > 0 ? (

    <>

      <Swiper
        modules={[Navigation, Thumbs]}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        className="rounded-3xl overflow-hidden"
      >

        {prodotto.images.map(
          (image: string, index: number) => (

            <SwiperSlide key={index}>

              <div className="relative h-[500px]">

                <Image
                  src={image}
                  alt={`${prodotto.name} ${index + 1}`}
                  fill
                  sizes="50vw"
                  className="object-cover"
                  priority={index === 0}
                />

              </div>

            </SwiperSlide>

          )
        )}

      </Swiper>

      {prodotto.images.length > 1 && (

        <Swiper
          modules={[Thumbs]}
          onSwiper={setThumbsSwiper}
          slidesPerView={4}
          spaceBetween={16}
          watchSlidesProgress
          className="mt-6"
        >

          {prodotto.images.map(
            (image: string, index: number) => (

              <SwiperSlide key={index}>

                <div className="relative h-24 rounded-2xl overflow-hidden cursor-pointer">

                  <Image
                    src={image}
                    alt={`${prodotto.name} ${index + 1}`}
                    fill
                    sizes="25vw"
                    className="object-cover"
                  />

                </div>

              </SwiperSlide>

            )
          )}

        </Swiper>

      )}

    </>

  ) : (

    <div className="bg-[#f7f2ec] rounded-3xl h-[500px] flex items-center justify-center text-9xl">
      👜
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
