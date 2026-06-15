"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [category, setCategory] = useState("Borse");
const [price, setPrice] = useState("");
const [isNew, setIsNew] = useState(false);
const [isVisible, setIsVisible] = useState(true);
const [saving, setSaving] = useState(false);
const [message, setMessage] = useState("");
const [images, setImages] = useState<string[]>([]);
const [newImages, setNewImages] = useState<File[]>([]);

useEffect(() => {
  async function loadProduct() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error || !data) {
      alert("Prodotto non trovato");
      router.push("/admin");
      return;
    }

    setTitle(data.name || "");
    setDescription(data.description || "");
    setCategory(data.category || "Borse");
    setPrice(data.price?.toString() || "");
    setIsNew(data.is_new || false);
    setIsVisible(data.is_visible || false);
    setImages(data.images || []);

    setLoading(false);
  }

  loadProduct();
}, [params.id, router]);
async function handleSave(e: React.FormEvent) {
  e.preventDefault();

  setSaving(true);
  setMessage("");

  const updatedImages = [...images];

for (const image of newImages) {
  const fileName = `${Date.now()}-${image.name}`;

  const { error: uploadError } = await supabase.storage
    .from("products")
    .upload(fileName, image);

  if (uploadError) {
    setMessage(`Errore upload: ${uploadError.message}`);
    setSaving(false);
    return;
  }

  const { data } = supabase.storage
    .from("products")
    .getPublicUrl(fileName);

  updatedImages.push(data.publicUrl);
}

const { error } = await supabase
  .from("products")
  .update({
    name: title,
    description,
    category,
    price: price ? Number(price) : null,
    images: updatedImages,
    is_new: isNew,
    is_visible: isVisible,
  })
  .eq("id", params.id);

  if (error) {
    setMessage(`Errore: ${error.message}`);
    setSaving(false);
    return;
  }

  setMessage("✅ Prodotto aggiornato con successo!");
  setNewImages([]);

  setTimeout(() => {
    router.push("/admin");
  }, 1500);

  setSaving(false);
}

  return (
    <main className="min-h-screen bg-[#faf8f5] px-6 py-10">

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8">

        <h1 className="text-4xl font-serif">
          Modifica prodotto
        </h1>

        <p className="text-gray-500 mt-2">
          ID: {params.id}
        </p>

       {loading ? (

  <p className="mt-6">
    Caricamento...
  </p>

) : (

  <form
    onSubmit={handleSave}
    className="mt-8 space-y-6"
  >

    <div>

      <label className="block text-sm font-medium mb-2">
        Titolo
      </label>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border rounded-lg px-4 py-3"
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
        type="number"
        step="0.01"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full border rounded-lg px-4 py-3"
      />

    </div>

<div>

  <label className="block text-sm font-medium mb-4">
    Immagini attuali
  </label>

  {images.length === 0 ? (

    <p className="text-gray-500">
      Nessuna immagine disponibile.
    </p>

  ) : (

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

      {images.map((image, index) => (

  <div
    key={index}
    className="relative"
  >

    <div className="relative h-32 rounded-xl overflow-hidden border">

      <Image
        src={image}
        alt={`Immagine ${index + 1}`}
        fill
        className="object-cover"
      />

    </div>

    <button
      type="button"
      onClick={() => {
        const conferma = window.confirm(
          "Vuoi eliminare questa immagine?"
        );

        if (!conferma) return;

        setImages((prev) =>
          prev.filter((_, i) => i !== index)
        );
      }}
      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition"
    >
      ×
    </button>

  </div>

))}

    </div>

  )}

</div>

    <div className="space-y-4">
    <div>

  <label className="block text-sm font-medium mb-2">
    Aggiungi nuove immagini
  </label>

  <input
    type="file"
    multiple
    accept="image/*"
    onChange={(e) => {
      if (e.target.files) {
        setNewImages(Array.from(e.target.files));
      }
    }}
    className="w-full border rounded-lg px-4 py-3"
  />

  {newImages.length > 0 && (

    <div className="mt-4 space-y-2">

      {newImages.map((image, index) => (

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
      disabled={saving}
      className="w-full bg-[#c7a384] text-white py-4 rounded-lg hover:opacity-90 transition disabled:opacity-50"
    >

      {saving
        ? "Salvataggio..."
        : "Salva modifiche"}

    </button>

    {message && (

      <div className="text-center font-medium">

        {message}

      </div>

    )}

  </form>

)}

      </div>

    </main>
  );
}