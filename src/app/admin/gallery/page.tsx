"use client";

import { useState, useEffect, useCallback } from "react";
import { Upload, Trash2, Loader2, ImageIcon } from "lucide-react";

type GalleryItem = {
  id: number;
  title: string | null;
  imageUrl: string;
  category: string | null;
};

const categories = ["Hair", "Face", "Nails", "Body", "Before-After", "Salon"];

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ title: "", category: "Hair", imageUrl: "" });

  const fetchGallery = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/gallery");
    if (res.ok) setItems(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { fetchGallery(); }, [fetchGallery]);

  const handleAdd = async () => {
    if (!form.imageUrl) return;
    setUploading(true);
    await fetch("/api/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setUploading(false);
    setForm({ title: "", category: "Hair", imageUrl: "" });
    fetchGallery();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Remove this image?")) return;
    await fetch(`/api/gallery/${id}`, { method: "DELETE" });
    fetchGallery();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
        Gallery
      </h1>

      {/* Add image form */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Upload className="w-4 h-4 text-pink-500" />
          Add Image
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Image URL</label>
            <input
              type="url"
              value={form.imageUrl}
              onChange={(e) => setForm((p) => ({ ...p, imageUrl: e.target.value }))}
              placeholder="https://..."
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Title (optional)</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              placeholder="e.g. Balayage Color"
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 cursor-pointer"
            >
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <button
          onClick={handleAdd}
          disabled={uploading || !form.imageUrl}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-pink-500 text-white text-sm font-medium hover:bg-pink-600 disabled:opacity-60 transition-colors cursor-pointer"
        >
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          Add to Gallery
        </button>
      </div>

      {/* Gallery grid */}
      {loading ? (
        <div className="p-10 text-center text-sm text-gray-400">Loading...</div>
      ) : items.length === 0 ? (
        <div className="p-10 text-center">
          <ImageIcon className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-gray-400">No gallery images yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.id} className="group relative rounded-2xl overflow-hidden bg-gray-100 aspect-square">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.imageUrl}
                alt={item.title ?? "Gallery image"}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-200 flex items-end p-3">
                <div className="translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-between w-full">
                  <span className="text-xs text-white font-medium">{item.title ?? item.category}</span>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
