"use client";

import Link from "next/link";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Product = {
  id: string;
  name: string;
  price: number | null;
  images: string[];
};

export default function ProductCard({
  prodotto,
}: {
  prodotto: Product;
}) {
  return (
    <Link href={`/prodotto/${prodotto.id}`}>

      <div className="group border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">

        <div className="relative h-72 overflow-hidden bg-[#f7f2ec]">

          {prodotto.images?.length > 0 ? (

            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{
                clickable: true,
              }}
              className="h-full"
            >

              {prodotto.images.map((image, index) => (

                <SwiperSlide key={index}>

                  <div className="relative h-72">

                    <Image
                      src={image}
                      alt={`${prodotto.name} ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />

                  </div>

                </SwiperSlide>

              ))}

            </Swiper>

          ) : (

            <div className="h-full flex items-center justify-center">

              <span className="text-7xl">
                👜
              </span>

            </div>

          )}

        </div>

        <div className="p-6">

          <h2 className="text-lg font-semibold">
            {prodotto.name}
          </h2>

          <p className="mt-4 text-[#b98d63] font-medium">

            {prodotto.price
              ? prodotto.price
              : "Contattami per il prezzo"}

          </p>

        </div>

      </div>

    </Link>
  );
}
