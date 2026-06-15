"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Search, Eye, EyeOff, Pencil, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Product = {
  id: string;
  name: string;
  category: string;
  price: string | null;
  images: string[];
  is_visible: boolean;
};

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadProducts() {
    setLoading(true);

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setProducts(data);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mt-10">

      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">

        <div className="relative w-full md:max-w-sm">

          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Cerca prodotto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg pl-10 pr-4 py-3"
          />

        </div>

        <Link
          href="/admin/add-product"
          className="bg-[#c7a384] text-white px-5 py-3 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition"
        >
          <Plus size={18} />

          Aggiungi prodotto
        </Link>

      </div>

      <div className="mt-8 bg-white rounded-2xl shadow-sm overflow-hidden">

        {loading ? (

          <div className="p-10 text-center text-gray-500">
            Caricamento prodotti...
          </div>

        ) : filteredProducts.length === 0 ? (

          <div className="p-10 text-center text-gray-500">
            Nessun prodotto trovato.
          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-[#faf8f5]">

                <tr className="text-left">

                  <th className="p-4">
                    Immagine
                  </th>

                  <th className="p-4">
                    Nome
                  </th>

                  <th className="p-4">
                    Categoria
                  </th>

                  <th className="p-4">
                    Prezzo
                  </th>

                  <th className="p-4">
                    Visibile
                  </th>

                  <th className="p-4">
                    Azioni
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredProducts.map((product) => (

                  <tr
                    key={product.id}
                    className="border-t"
                  >

                    <td className="p-4">

                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">

                        {product.images?.[0] && (

                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />

                        )}

                      </div>

                    </td>

                    <td className="p-4 font-medium">
                      {product.name}
                    </td>

                    <td className="p-4">
                      {product.category}
                    </td>

                    <td className="p-4">

                      {product.price ||
                        "Contattami"}

                    </td>

                    <td className="p-4">

                     <button
  onClick={async () => {
    const nuovoStato = !product.is_visible;

    const { error } = await supabase
      .from("products")
      .update({
        is_visible: nuovoStato,
      })
      .eq("id", product.id);

    if (error) {
      alert("Errore durante l'aggiornamento.");
      return;
    }

    setProducts((prev) =>
      prev.map((p) =>
        p.id === product.id
          ? {
              ...p,
              is_visible: nuovoStato,
            }
          : p
      )
    );
  }}
>

  {product.is_visible ? (

    <span className="text-green-600 flex items-center gap-2">

      <Eye size={18} />

      Sì

    </span>

  ) : (

    <span className="text-red-600 flex items-center gap-2">

      <EyeOff size={18} />

      No

    </span>

  )}

</button>

                    </td>

                    <td className="p-4">

                      <div className="flex gap-3">

                       <Link
  href={`/admin/edit-product/${product.id}`}
  className="text-blue-600 hover:opacity-70"
>

  <Pencil size={18} />

</Link>

                       <button
  onClick={async () => {
    const conferma = window.confirm(
      `Vuoi eliminare "${product.name}"?`
    );

    if (!conferma) return;

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", product.id);

    if (error) {
      alert("Errore durante l'eliminazione.");
      console.error(error);
      return;
    }

    setProducts((prev) =>
      prev.filter((p) => p.id !== product.id)
    );

    alert("Prodotto eliminato con successo!");
  }}
  className="text-red-600 hover:opacity-70"
>

  <Trash2 size={18} />

</button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}