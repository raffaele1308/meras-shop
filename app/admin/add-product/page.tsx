"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AddProductPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Borse");
  const [price, setPrice] = useState("");
  const [isNew, setIsNew] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [images, setImages] = useState<File[]>([]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
setUploading(true);
setMessage("");

    const imageUrls: string[] = [];

for (const image of images) {
  const fileName = `${Date.now()}-${image.name}`;

  const { error: uploadError } = await supabase.storage
    .from("products")
    .upload(fileName, image);

  if (uploadError) {
    setMessage(`Errore upload: ${uploadError.message}`);
    setLoading(false);
    setUploading(false);
    return;
  }

  const { data } = supabase.storage
    .from("products")
    .getPublicUrl(fileName);

  imageUrls.push(data.publicUrl);
}

const { error } = await supabase.from("products").insert([
  {
    name: title,
    description,
    category,
    price: price || null,
    images: imageUrls,
    is_visible: isVisible,
    is_new: isNew,
  },
]);

    if (error) {
      setMessage(`Errore: ${error.message}`);
    } else {
      setMessage("✅ Prodotto salvato con successo!");

      setTitle("");
      setDescription("");
      setCategory("Borse");
      setPrice("");
      setIsNew(false);
      setIsVisible(true);
      setImages([]);
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#faf8f5] px-6 py-10">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-serif">
          Aggiungi prodotto
        </h1>

        <p className="text-gray-500 mt-2">
          Inserisci un nuovo articolo nel catalogo.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-sm p-8 mt-8 space-y-6"
        >

          <div>
            <label className="block text-sm font-medium mb-2">
              Titolo
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border rounded-lg px-4 py-3"
              placeholder="Es. Borsa Elegance"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Descrizione
            </label>

            <textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-lg px-4 py-3"
              placeholder="Descrivi il prodotto..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Categoria
            </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-lg px-4 py-3"
            >
              <option value="Borse">
                Borse
              </option>

              <option value="Casa">
                Casa
              </option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Prezzo
            </label>

            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border rounded-lg px-4 py-3"
              placeholder="Lascia vuoto per mostrare 'Contattami per il prezzo'"
            />
          </div>

          <div>
  <label className="block text-sm font-medium mb-2">
    Immagini prodotto
  </label>

  <input
    type="file"
    multiple
    accept="image/*"
    onChange={(e) => {
      if (e.target.files) {
        setImages(Array.from(e.target.files));
      }
    }}
    className="w-full border rounded-lg px-4 py-3"
  />

  {images.length > 0 && (
    <div className="mt-4 space-y-2">
      {images.map((image, index) => (
        <div
          key={index}
          className="text-sm text-gray-600"
        >
          📷 {image.name}
        </div>
      ))}
    </div>
  )}
</div>   
          <div className="space-y-4">

            <label className="flex items-center gap-3">

              <input
                type="checkbox"
                checked={isNew}
                onChange={(e) => setIsNew(e.target.checked)}
              />

              <span>
                Mostra tra le Novità
              </span>

            </label>

            <label className="flex items-center gap-3">

              <input
                type="checkbox"
                checked={isVisible}
                onChange={(e) => setIsVisible(e.target.checked)}
              />

              <span>
                Prodotto visibile
              </span>

            </label>

          </div>

          <button
  type="submit"
  disabled={loading}
  className="w-full bg-[#c7a384] text-white py-4 rounded-lg hover:opacity-90 transition disabled:opacity-50"
>
  {uploading
    ? "Caricamento immagini..."
    : loading
    ? "Salvataggio..."
    : "Salva prodotto"}
</button>

          {message && (
            <div className="text-center font-medium">
              {message}
            </div>
          )}

        </form>

      </div>
    </main>
  );
}