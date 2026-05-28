"use client";

import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import toast from "react-hot-toast";
import { MapPin, Users, Star, BadgeCheck, ChevronLeft, ChevronRight, Plus, X } from "lucide-react";

import { apiRequest } from "@/api/client";
import { ROOM_AMENITIES, ROOM_TYPES } from "@/lib/constants";
import { formatCurrency } from "@/utils/format";

import { Modal } from "@/components/modal";

const PAGE_SIZE = 10;

interface AdminRoomManagerProps {
  rooms: Array<{
    _id: string;
    name: string;
    type: string;
    price: number;
    location: string;
    availabilityStatus: string;
    featured: boolean;
    description: string;
    images: string[];
    amenities: string[];
    capacity: number;
  }>;
}

export function AdminRoomManager({ rooms }: AdminRoomManagerProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<AdminRoomManagerProps["rooms"][number] | null>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const totalPages = Math.ceil(rooms.length / PAGE_SIZE);
  const paginated = rooms.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function beginCreate() {
    setEditingRoom(null);
    setImageUrls([]);
    setNewImageUrl("");
    setOpen(true);
  }

  function beginEdit(room: AdminRoomManagerProps["rooms"][number]) {
    setEditingRoom(room);
    setImageUrls(room.images);
    setNewImageUrl("");
    setOpen(true);
  }

  async function handleDelete(id: string) {
    setConfirmDeleteId(null);
    try {
      await apiRequest(`/api/rooms/${id}`, { method: "DELETE" });
      toast.success("Room deleted.");
      startTransition(() => router.refresh());
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Delete failed.");
    }
  }

  async function handleSubmit(formData: FormData) {
    setLoading(true);

    try {
      const payload = {
        name: String(formData.get("name") ?? ""),
        type: String(formData.get("type") ?? ""),
        location: String(formData.get("location") ?? ""),
        description: String(formData.get("description") ?? ""),
        price: Number(formData.get("price") ?? 0),
        capacity: Number(formData.get("capacity") ?? 1),
        availabilityStatus: String(formData.get("availabilityStatus") ?? "available"),
        featured: formData.get("featured") === "on",
        images: String(formData.get("images") ?? "")
          .split("\n")
          .map((value) => value.trim())
          .filter(Boolean),
        amenities: formData.getAll("amenities").map((value) => String(value)),
      };

      if (editingRoom) {
        await apiRequest(`/api/rooms/${editingRoom._id}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        });
        toast.success("Room updated.");
      } else {
        await apiRequest("/api/rooms", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        toast.success("Room created.");
      }

      setOpen(false);
      startTransition(() => router.refresh());
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Save failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#E5E7EB] px-6 py-5">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#22C7C7]">Inventory</p>
          <h2 className="mt-1.5 text-2xl font-semibold text-[#111827]">Manage rooms</h2>
        </div>
        <button
          onClick={beginCreate}
          className="rounded-full bg-[#22C7C7] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1AB5B5]"
        >
          + Add room
        </button>
      </div>

      {rooms.length === 0 ? (
        <div className="px-6 py-12 text-center text-[#9CA3AF]">No rooms yet. Add your first room above.</div>
      ) : (
        <>
          <div className="divide-y divide-[#F1F5F9]">
            {paginated.map((room) => {
              const available = room.availabilityStatus === "available";
              return (
                <div
                  key={room._id}
                  className="flex flex-col gap-4 px-6 py-5 transition hover:bg-[#F8FAFC] sm:flex-row sm:items-center sm:gap-5"
                >
                  {/* Thumbnail */}
                  {room.images[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={room.images[0]}
                      alt={room.name}
                      className="h-16 w-24 shrink-0 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="flex h-16 w-24 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#22C7C7]/20 to-[#22C7C7]/5 text-xs text-[#22C7C7]">
                      No image
                    </div>
                  )}

                  {/* Main info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-[#111827]">{room.name}</h3>
                      <span className="rounded-full bg-[#F1F5F9] px-2 py-0.5 text-xs font-medium text-[#6B7280]">
                        {room.type}
                      </span>
                      {room.featured && (
                        <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-600">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          Featured
                        </span>
                      )}
                      <span
                        className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                          available
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        <BadgeCheck className="h-3 w-3" />
                        {available ? "Available" : room.availabilityStatus}
                      </span>
                    </div>
                    <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#9CA3AF]">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {room.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {room.capacity} guests
                      </span>
                      <span className="font-semibold text-[#374151]">
                        {formatCurrency(room.price)}/night
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      onClick={() => beginEdit(room)}
                      className="rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-sm text-[#374151] transition hover:border-[#22C7C7]/40 hover:text-[#22C7C7]"
                    >
                      Edit
                    </button>
                    {confirmDeleteId === room._id ? (
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-[#6B7280]">Delete?</span>
                        <button
                          onClick={() => void handleDelete(room._id)}
                          className="rounded-full bg-red-500 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-red-600"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(null)}
                          className="rounded-full border border-[#E5E7EB] px-3 py-1.5 text-xs font-semibold text-[#374151] transition hover:bg-[#F1F5F9]"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDeleteId(room._id)}
                        className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600 transition hover:bg-red-100"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-[#E5E7EB] px-6 py-4 text-sm">
              <p className="text-[#9CA3AF]">
                Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, rooms.length)} of {rooms.length}
              </p>
              <div className="flex items-center gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E5E7EB] text-[#374151] transition hover:bg-[#F1F5F9] disabled:pointer-events-none disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-[#374151]">{page} / {totalPages}</span>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E5E7EB] text-[#374151] transition hover:bg-[#F1F5F9] disabled:pointer-events-none disabled:opacity-40"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title={editingRoom ? "Edit room" : "Add room"}>
        <form
          action={(formData) => {
            void handleSubmit(formData);
          }}
          className="grid gap-4"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <input
              name="name"
              defaultValue={editingRoom?.name ?? ""}
              placeholder="Room name"
              className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-[#111827] outline-none focus:border-[#22C7C7] focus:ring-2 focus:ring-[#22C7C7]/20"
            />
            <select name="type" defaultValue={editingRoom?.type ?? ROOM_TYPES[0]} className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-[#111827] outline-none focus:border-[#22C7C7]">
              {ROOM_TYPES.map((roomType) => (
                <option key={roomType} value={roomType}>
                  {roomType}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <input
              name="location"
              defaultValue={editingRoom?.location ?? ""}
              placeholder="Location"
              className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-[#111827] outline-none focus:border-[#22C7C7] focus:ring-2 focus:ring-[#22C7C7]/20"
            />
            <input
              name="price"
              type="number"
              defaultValue={editingRoom?.price ?? 12000}
              placeholder="Price"
              className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-[#111827] outline-none focus:border-[#22C7C7] focus:ring-2 focus:ring-[#22C7C7]/20"
            />
            <input
              name="capacity"
              type="number"
              defaultValue={editingRoom?.capacity ?? 2}
              placeholder="Capacity"
              className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-[#111827] outline-none focus:border-[#22C7C7] focus:ring-2 focus:ring-[#22C7C7]/20"
            />
          </div>

          <select
            name="availabilityStatus"
            defaultValue={editingRoom?.availabilityStatus ?? "available"}
            className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-[#111827] outline-none focus:border-[#22C7C7]"
          >
            <option value="available">Available</option>
            <option value="limited">Limited</option>
            <option value="unavailable">Unavailable</option>
          </select>

          <textarea
            name="description"
            rows={4}
            defaultValue={editingRoom?.description ?? ""}
            placeholder="Description"
            className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-[#111827] outline-none focus:border-[#22C7C7] focus:ring-2 focus:ring-[#22C7C7]/20"
          />

          {/* Image URL manager */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Room images</p>
            <div className="flex gap-2">
              <input
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="Paste an image URL and click Add"
                className="flex-1 rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#111827] outline-none focus:border-[#22C7C7] focus:ring-2 focus:ring-[#22C7C7]/20"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const url = newImageUrl.trim();
                    if (url) { setImageUrls((p) => [...p, url]); setNewImageUrl(""); }
                  }
                }}
              />
              <button
                type="button"
                onClick={() => {
                  const url = newImageUrl.trim();
                  if (url) { setImageUrls((p) => [...p, url]); setNewImageUrl(""); }
                }}
                className="flex items-center gap-1.5 rounded-xl bg-[#22C7C7] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1AB5B5]"
              >
                <Plus className="h-4 w-4" />
                Add
              </button>
            </div>
            {imageUrls.length > 0 ? (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {imageUrls.map((url, i) => (
                  <div key={i} className="group relative overflow-hidden rounded-xl border border-[#E5E7EB]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={url}
                      alt=""
                      className="h-24 w-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.background = "#F1F5F9";
                        (e.currentTarget as HTMLImageElement).alt = "Invalid URL";
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setImageUrls((p) => p.filter((_, j) => j !== i))}
                      className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition group-hover:opacity-100"
                    >
                      <X className="h-3 w-3" />
                    </button>
                    {i === 0 && (
                      <span className="absolute bottom-1.5 left-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white">
                        Cover
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="rounded-xl border border-dashed border-[#E5E7EB] px-4 py-6 text-center text-sm text-[#9CA3AF]">
                No images added. Paste a URL above and click Add.
              </p>
            )}
            <input type="hidden" name="images" value={imageUrls.join("\n")} />
          </div>

          <div className="grid gap-2 md:grid-cols-2">
            {ROOM_AMENITIES.map((amenity) => (
              <label key={amenity} className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-3 text-[#374151] transition hover:border-[#22C7C7]/30">
                <input
                  type="checkbox"
                  name="amenities"
                  value={amenity}
                  defaultChecked={editingRoom?.amenities.includes(amenity) ?? false}
                  className="accent-[#22C7C7]"
                />
                <span className="text-sm">{amenity}</span>
              </label>
            ))}
          </div>

          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-3 text-[#374151] transition hover:border-[#22C7C7]/30">
            <input type="checkbox" name="featured" defaultChecked={editingRoom?.featured ?? false} className="accent-[#22C7C7]" />
            <span className="text-sm">Feature this room on the homepage</span>
          </label>

          <button type="submit" disabled={loading} className="rounded-full bg-[#22C7C7] px-5 py-3 font-semibold text-white transition hover:bg-[#1AB5B5] disabled:opacity-60">
            {loading ? "Saving..." : editingRoom ? "Save changes" : "Create room"}
          </button>
        </form>
      </Modal>
    </section>
  );
}
