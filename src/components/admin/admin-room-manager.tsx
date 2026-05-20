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
    <section className="space-y-5 rounded-[2rem] border border-white/15 bg-white/10 p-6 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-white/40">Inventory</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Manage rooms</h2>
        </div>
        <button onClick={beginCreate} className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950">
          Add room
        </button>
      </div>

      <div className="grid gap-4">
        {rooms.map((room) => (
          <article
            key={room._id}
            className="flex flex-col gap-4 rounded-[1.5rem] border border-white/10 bg-white/5 p-5 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <h3 className="text-xl font-semibold text-white">{room.name}</h3>
              <p className="mt-1 text-sm text-white/60">
                {room.type} in {room.location}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => beginEdit(room)}
                className="rounded-full border border-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/10"
              >
                Edit
              </button>
              <button
                onClick={() => void handleDelete(room._id)}
                className="rounded-full border border-rose-300/20 px-4 py-2 text-sm text-rose-200 transition hover:bg-rose-400/10"
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
          className="grid gap-4 text-white"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <input
              name="name"
              defaultValue={editingRoom?.name ?? ""}
              placeholder="Room name"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
            />
            <select name="type" defaultValue={editingRoom?.type ?? ROOM_TYPES[0]} className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3">
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
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
            />
            <input
              name="price"
              type="number"
              defaultValue={editingRoom?.price ?? 12000}
              placeholder="Price"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
            />
            <input
              name="capacity"
              type="number"
              defaultValue={editingRoom?.capacity ?? 2}
              placeholder="Capacity"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
            />
          </div>

          <select
            name="availabilityStatus"
            defaultValue={editingRoom?.availabilityStatus ?? "available"}
            className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3"
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
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
          />

          <textarea
            name="images"
            rows={4}
            defaultValue={editingRoom?.images.join("\n") ?? ""}
            placeholder="One image URL per line"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
          />

          <div className="grid gap-2 md:grid-cols-2">
            {ROOM_AMENITIES.map((amenity) => (
              <label key={amenity} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <input
                  type="checkbox"
                  name="amenities"
                  value={amenity}
                  defaultChecked={editingRoom?.amenities.includes(amenity) ?? false}
                />
                <span>{amenity}</span>
              </label>
            ))}
          </div>

          <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <input type="checkbox" name="featured" defaultChecked={editingRoom?.featured ?? false} />
            <span>Feature this room on the homepage</span>
          </label>

          <button type="submit" disabled={loading} className="rounded-full bg-white px-5 py-3 font-semibold text-slate-950">
            {loading ? "Saving..." : editingRoom ? "Save changes" : "Create room"}
          </button>
        </form>
      </Modal>
    </section>
  );
}
