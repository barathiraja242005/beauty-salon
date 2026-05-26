"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Pencil, Trash2, Loader2, X, Check } from "lucide-react";

type Service = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  duration: number;
  category: string;
  isActive: boolean | null;
};

const categories = ["Hair", "Face", "Nails", "Body & Spa", "Waxing"];

const emptyForm = { name: "", description: "", price: "", duration: "", category: "Hair" };

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchServices = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/services");
    if (res.ok) setServices(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { fetchServices(); }, [fetchServices]);

  const handleSave = async () => {
    if (!form.name || !form.price || !form.duration) return;
    setSaving(true);
    const payload = {
      name: form.name,
      description: form.description,
      price: parseInt(form.price),
      duration: parseInt(form.duration),
      category: form.category,
    };
    if (editId) {
      await fetch(`/api/services/${editId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }
    setSaving(false);
    setShowForm(false);
    setForm(emptyForm);
    setEditId(null);
    fetchServices();
  };

  const handleEdit = (svc: Service) => {
    setForm({ name: svc.name, description: svc.description ?? "", price: String(svc.price), duration: String(svc.duration), category: svc.category });
    setEditId(svc.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this service?")) return;
    await fetch(`/api/services/${id}`, { method: "DELETE" });
    fetchServices();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>
          Services
        </h1>
        <button
          onClick={() => { setShowForm(true); setEditId(null); setForm(emptyForm); }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-pink-500 text-white text-sm font-medium hover:bg-pink-600 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Service
        </button>
      </div>

      {/* Add/Edit form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-pink-200 shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900">{editId ? "Edit Service" : "New Service"}</h2>
            <button onClick={() => setShowForm(false)} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Service Name", key: "name", type: "text", placeholder: "e.g. Hair Color" },
              { label: "Price (₹)", key: "price", type: "number", placeholder: "e.g. 1200" },
              { label: "Duration (min)", key: "duration", type: "number", placeholder: "e.g. 60" },
            ].map((field) => (
              <div key={field.key}>
                <label className="block text-xs font-medium text-gray-700 mb-1">{field.label}</label>
                <input
                  type={field.type}
                  value={form[field.key as keyof typeof form]}
                  onChange={(e) => setForm((p) => ({ ...p, [field.key]: e.target.value }))}
                  placeholder={field.placeholder}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
            ))}
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
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                placeholder="Short description..."
                rows={2}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
              />
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="mt-4 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-pink-500 text-white text-sm font-medium hover:bg-pink-600 disabled:opacity-60 transition-colors cursor-pointer"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            {editId ? "Save Changes" : "Add Service"}
          </button>
        </div>
      )}

      {/* Services table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-sm text-gray-400">Loading...</div>
        ) : services.length === 0 ? (
          <div className="p-10 text-center text-sm text-gray-400">No services yet. Add your first service.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {["Service", "Category", "Price", "Duration", "Actions"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {services.map((svc) => (
                  <tr key={svc.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <p className="font-medium text-gray-900">{svc.name}</p>
                      <p className="text-xs text-gray-400">{svc.description}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className="px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 text-xs font-medium">{svc.category}</span>
                    </td>
                    <td className="px-5 py-4 font-semibold text-gray-900">₹{svc.price.toLocaleString()}</td>
                    <td className="px-5 py-4 text-gray-600">{svc.duration} min</td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(svc)} className="p-1.5 rounded-lg text-blue-500 hover:bg-blue-50 transition-colors cursor-pointer"><Pencil className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(svc.id)} className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors cursor-pointer"><Trash2 className="w-4 h-4" /></button>
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
