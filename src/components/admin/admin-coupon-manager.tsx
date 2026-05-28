"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, ToggleLeft, ToggleRight, Tag, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import toast from "react-hot-toast";

import { apiRequest } from "@/api/client";

interface Coupon {
  _id: string;
  code: string;
  type: "percent" | "flat";
  value: number;
  minOrder: number;
  label: string;
  active: boolean;
  usageCount: number;
}

const inputCls =
  "w-full rounded-xl border border-[#E5E7EB] bg-[#F7F9FC] px-3 py-2.5 text-sm text-[#1A2235] outline-none transition focus:border-[#22C7C7] focus:ring-2 focus:ring-[#22C7C7]/15";

export function AdminCouponManager({ coupons: initial }: { coupons: Coupon[] }) {
  const router = useRouter();
  const [coupons, setCoupons] = useState<Coupon[]>(initial);
  const [showForm, setShowForm] = useState(false);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    code: "",
    type: "percent" as "percent" | "flat",
    value: "",
    minOrder: "",
    label: "",
  });

  function setField<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setLoadingId("new");
    try {
      const res = await apiRequest<Coupon>("/api/coupons", {
        method: "POST",
        body: JSON.stringify({
          code: form.code,
          type: form.type,
          value: Number(form.value),
          minOrder: form.minOrder ? Number(form.minOrder) : 0,
          label: form.label,
        }),
      });
      setCoupons((c) => [res.data, ...c]);
      setForm({ code: "", type: "percent", value: "", minOrder: "", label: "" });
      setShowForm(false);
      toast.success("Coupon created.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to create coupon.");
    } finally {
      setLoadingId(null);
    }
  }

  async function toggleActive(coupon: Coupon) {
    setLoadingId(coupon._id);
    try {
      await apiRequest(`/api/coupons/${coupon._id}`, {
        method: "PATCH",
        body: JSON.stringify({ active: !coupon.active }),
      });
      setCoupons((cs) => cs.map((c) => c._id === coupon._id ? { ...c, active: !c.active } : c));
      toast.success(coupon.active ? "Coupon disabled." : "Coupon enabled.");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update coupon.");
    } finally {
      setLoadingId(null);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this coupon permanently?")) return;
    setLoadingId(id);
    try {
      await apiRequest(`/api/coupons/${id}`, { method: "DELETE" });
      setCoupons((cs) => cs.filter((c) => c._id !== id));
      toast.success("Coupon deleted.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete coupon.");
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
      <div className="h-1 bg-gradient-to-r from-[#22C7C7] via-[#1AB5B5] to-[#22C7C7]" />
      <div className="flex items-center justify-between gap-4 border-b border-[#E5E7EB] px-6 py-5">
        <div className="flex items-center gap-2.5">
          <Tag size={16} className="text-[#22C7C7]" />
          <h2 className="font-bold text-[#1A2235]">Coupon Manager</h2>
          <span className="rounded-full bg-[#22C7C7]/10 px-2.5 py-0.5 text-xs font-semibold text-[#22C7C7]">
            {coupons.length}
          </span>
        </div>
        <button
          onClick={() => setShowForm((p) => !p)}
          className="flex items-center gap-1.5 rounded-xl bg-[#22C7C7] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1AB5B5]"
        >
          {showForm ? <ChevronUp size={14} /> : <Plus size={14} />}
          {showForm ? "Cancel" : "New coupon"}
        </button>
      </div>

      {/* Create form */}
      {showForm && (
        <form onSubmit={handleCreate} className="border-b border-[#E5E7EB] bg-[#F7F9FC] px-6 py-5">
          <p className="mb-4 text-sm font-semibold text-[#1A2235]">Create new coupon</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-[#64748B]">Code</label>
              <input
                required
                value={form.code}
                onChange={(e) => setField("code", e.target.value.toUpperCase())}
                placeholder="e.g. SAVE20"
                className={`${inputCls} font-mono tracking-widest`}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-[#64748B]">Type</label>
              <select
                value={form.type}
                onChange={(e) => setField("type", e.target.value as "percent" | "flat")}
                className={inputCls}
              >
                <option value="percent">Percentage (%)</option>
                <option value="flat">Flat amount (₹)</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-[#64748B]">
                {form.type === "percent" ? "Discount %" : "Discount ₹"}
              </label>
              <input
                required
                type="number"
                min={1}
                max={form.type === "percent" ? 100 : undefined}
                value={form.value}
                onChange={(e) => setField("value", e.target.value)}
                placeholder={form.type === "percent" ? "e.g. 20" : "e.g. 1500"}
                className={inputCls}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-[#64748B]">Min order (₹)</label>
              <input
                type="number"
                min={0}
                value={form.minOrder}
                onChange={(e) => setField("minOrder", e.target.value)}
                placeholder="0 = no minimum"
                className={inputCls}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-medium text-[#64748B]">Label (shown to users)</label>
              <input
                required
                value={form.label}
                onChange={(e) => setField("label", e.target.value)}
                placeholder="e.g. 20% off your booking"
                className={inputCls}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loadingId === "new"}
            className="mt-4 flex items-center gap-2 rounded-xl bg-[#22C7C7] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1AB5B5] disabled:opacity-60"
          >
            {loadingId === "new" && <Loader2 size={14} className="animate-spin" />}
            Create coupon
          </button>
        </form>
      )}

      {/* Coupon list */}
      {coupons.length === 0 ? (
        <p className="px-6 py-10 text-center text-sm text-[#9CA3AF]">No coupons yet. Create one above.</p>
      ) : (
        <div className="divide-y divide-[#F1F5F9]">
          {coupons.map((coupon) => (
            <div
              key={coupon._id}
              className={`flex flex-wrap items-center gap-4 px-6 py-4 transition ${!coupon.active ? "opacity-50" : ""}`}
            >
              {/* Code badge */}
              <span className="rounded-lg border border-[#DBEAFE] bg-[#EEF4FF] px-3 py-1 font-mono text-sm font-bold text-[#0057D9]">
                {coupon.code}
              </span>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-semibold text-[#1A2235]">{coupon.label}</p>
                <p className="text-xs text-[#9CA3AF]">
                  {coupon.type === "percent" ? `${coupon.value}% off` : `₹${coupon.value.toLocaleString("en-IN")} off`}
                  {coupon.minOrder > 0 && ` · min ₹${coupon.minOrder.toLocaleString("en-IN")}`}
                  {" · "}
                  {coupon.usageCount} use{coupon.usageCount !== 1 ? "s" : ""}
                </p>
              </div>

              {/* Status badge */}
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${coupon.active ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                {coupon.active ? "Active" : "Disabled"}
              </span>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleActive(coupon)}
                  disabled={loadingId === coupon._id}
                  title={coupon.active ? "Disable" : "Enable"}
                  className="rounded-lg p-2 text-[#64748B] transition hover:bg-[#F1F5F9] hover:text-[#1A2235] disabled:opacity-50"
                >
                  {loadingId === coupon._id ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : coupon.active ? (
                    <ToggleRight size={18} className="text-[#22C7C7]" />
                  ) : (
                    <ToggleLeft size={18} />
                  )}
                </button>
                <button
                  onClick={() => handleDelete(coupon._id)}
                  disabled={loadingId === coupon._id}
                  title="Delete coupon"
                  className="rounded-lg p-2 text-[#64748B] transition hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
