"use client";

import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import toast from "react-hot-toast";

import { apiRequest } from "@/api/client";
import { ROOM_AMENITIES, ROOM_TYPES } from "@/lib/constants";

import { Modal } from "@/components/modal";

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

  function beginCreate() {
    setEditingRoom(null);
    setOpen(true);
  }

  function beginEdit(room: AdminRoomManagerProps["rooms"][number]) {
    setEditingRoom(room);
    setOpen(true);
  }

  async function handleDelete(id: string) {
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
    <section className="space-y-5 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#22C7C7]">Inventory</p>
          <h2 className="mt-2 text-2xl font-semibold text-[#111827]">Manage rooms</h2>
        </div>
        <button onClick={beginCreate} className="rounded-full bg-[#22C7C7] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1AB5B5]">
          Add room
        </button>
      </div>

      <div className="grid gap-4">
        {rooms.map((room) => (
          <article
            key={room._id}
            className="flex flex-col gap-4 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] p-5 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <h3 className="text-base font-semibold text-[#111827]">{room.name}</h3>
              <p className="mt-1 text-sm text-[#6B7280]">
                {room.type} in {room.location}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => beginEdit(room)}
                className="rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-sm text-[#374151] transition hover:border-[#22C7C7]/40 hover:text-[#22C7C7]"
              >
                Edit
              </button>
              <button
                onClick={() => void handleDelete(room._id)}
                className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600 transition hover:bg-red-100"
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>

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

          <textarea
            name="images"
            rows={4}
            defaultValue={editingRoom?.images.join("\n") ?? ""}
            placeholder="One image URL per line"
            className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-[#111827] outline-none focus:border-[#22C7C7] focus:ring-2 focus:ring-[#22C7C7]/20"
          />

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
