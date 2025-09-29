"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Button from "@/app/components/Reuse/button";
import { Plus, Edit, Trash2, Check, Calendar, Search } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// --- Types ---
type Lead = {
  _id: string;
  name: string;
  phone: string;
  [k: string]: unknown;
};

type Meeting = {
  id: string;
  leadId: string;
  datetime: string; // ISO
  completed: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

type DateTimeAMPM = {
  date: string; // yyyy-mm-dd
  hour: string; // 01 - 12
  minute: string; // 00 - 59
  ampm: "AM" | "PM";
};

// --- Helpers ---
const isoToDateTimeAMPM = (iso?: string): DateTimeAMPM => {
  if (!iso) return { date: "", hour: "", minute: "", ampm: "AM" };
  const d = new Date(iso);
  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
  const yyyy = d.getFullYear();
  const mm = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const hours24 = d.getHours();
  const ampm = hours24 >= 12 ? "PM" : "AM";
  let hours12 = hours24 % 12;
  if (hours12 === 0) hours12 = 12;
  const hour = pad(hours12);
  const minute = pad(d.getMinutes());
  return { date: `${yyyy}-${mm}-${dd}`, hour, minute, ampm };
};
const dateTimeAMPMtoISO = (dt: DateTimeAMPM): string => {
  if (!dt.date) return "";
  const now = new Date();
  const hour = dt.hour ? parseInt(dt.hour, 10) : now.getHours() % 12 || 12;
  const minute = dt.minute ? parseInt(dt.minute, 10) : 0;
  const ampm = dt.ampm ?? "AM";
  let hour24 = hour;
  if (ampm === "PM" && hour24 < 12) hour24 += 12;
  if (ampm === "AM" && hour24 === 12) hour24 = 0;
  const [y, mo, d] = dt.date.split("-").map((s) => parseInt(s, 10));
  if (!y || !mo || !d) return "";
  const localDate = new Date(y, mo - 1, d, hour24, minute, 0, 0);
  return localDate.toISOString();
};

const shortDateTime12hr = (iso?: string) => {
  if (!iso) return "-";
  const d = new Date(iso);
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

// --- DateTimePicker Component ---
type DateTimePickerProps = {
  value: DateTimeAMPM;
  onChange: (val: DateTimeAMPM) => void;
  label?: string;
  className?: string;
};
function DateTimePicker({ value, onChange, label, className }: DateTimePickerProps) {
  const onDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, date: e.target.value });
  };
  const onHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...value, hour: e.target.value });
  };
  const onMinuteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...value, minute: e.target.value });
  };
  const onAMPMChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...value, ampm: e.target.value as "AM" | "PM" });
  };
  const hourOptions = [];
  for (let h = 1; h <= 12; h++) {
    const hh = h.toString().padStart(2, "0");
    hourOptions.push(<option key={hh} value={hh}>{h}</option>);
  }
  const minuteOptions = [];
  for (let m = 0; m < 60; m++) {
    const mm = m.toString().padStart(2, "0");
    minuteOptions.push(<option key={mm} value={mm}>{mm}</option>);
  }
  return (
    <div className={className}>
      {label && <label className="block text-sm text-gray-300 mb-1">{label}</label>}
      <div className="flex gap-2 items-center">
        <input type="date" value={value.date} onChange={onDateChange}
          className="p-2 rounded bg-[#111] border border-gray-700 text-sm w-auto flex-grow" />
        <select value={value.hour} onChange={onHourChange}
          className="p-2 rounded bg-[#111] border border-gray-700 text-sm w-16 text-center" aria-label="Select hour">
          {hourOptions}
        </select>
        <span className="text-gray-400 select-none">:</span>
        <select value={value.minute} onChange={onMinuteChange}
          className="p-2 rounded bg-[#111] border border-gray-700 text-sm w-16 text-center" aria-label="Select minute">
          {minuteOptions}
        </select>
        <select value={value.ampm} onChange={onAMPMChange}
          className="p-2 rounded bg-[#111] border border-gray-700 text-sm w-20 text-center" aria-label="Select AM/PM">
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
    </div>
  );
}

export default function Meetings() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSchedule, setShowSchedule] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [dtValue, setDtValue] = useState<DateTimeAMPM>({ date: "", hour: "", minute: "", ampm: "AM" });
  const [notes, setNotes] = useState("");
  const [editingMeeting, setEditingMeeting] = useState<Meeting | null>(null);
  const [search, setSearch] = useState("");
  const [leadSearch, setLeadSearch] = useState("");
  const [nextDtValue, setNextDtValue] = useState<DateTimeAMPM>({ date: "", hour: "", minute: "", ampm: "AM" });
  const [showNextMeetingInput, setShowNextMeetingInput] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [lRes, mRes] = await Promise.all([fetch("/api/leads"), fetch("/api/meetings")]);
        const leadsData = await lRes.json();
        const meetingsData = await mRes.json();
        setLeads(Array.isArray(leadsData) ? leadsData : []);
        setMeetings(Array.isArray(meetingsData) ? meetingsData : []);
      } catch (err) {
        console.error("Fetch error", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // --- Find true next upcoming meeting (pending, future) ---
  const upcomingMeeting = useMemo(() => {
    const now = new Date();
    const upcoming = meetings
      .filter((m) => !m.completed && new Date(m.datetime) > now)
      .sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime());
    return upcoming[0] || null;
  }, [meetings]);

  // Filtered meetings by search text (lead name, phone or notes)
  const filteredMeetings = useMemo(() => {
    if (!search.trim()) return meetings;
    const q = search.toLowerCase();
    const leadMap = new Map(leads.map((ld) => [ld._id, ld]));
    return meetings.filter((m) => {
      const lead = leadMap.get(m.leadId) as Lead | undefined;
      const leadName = lead?.name?.toLowerCase() ?? "";
      const leadPhone = lead?.phone?.toString() ?? "";
      return (
        leadName.includes(q) ||
        leadPhone.includes(q) ||
        (m.notes && m.notes.toLowerCase().includes(q))
      );
    });
  }, [meetings, search, leads]);

  const filteredLeads = useMemo(() => {
    if (!leadSearch.trim()) return leads;
    const q = leadSearch.toLowerCase();
    return leads.filter(
      (ld) =>
        ld.name.toLowerCase().includes(q) ||
        ld.phone?.toString().toLowerCase().includes(q)
    );
  }, [leadSearch, leads]);

  // Map lead ids to leads for quick lookup
  const leadById = useMemo(() => {
    const map = new Map<string, Lead>();
    for (const l of leads) map.set(l._id, l);
    return map;
  }, [leads]);

  // --- CRUD Handling ---
  function openScheduleFor(leadId?: string) {
    setSelectedLeadId(leadId || null);
    const now = new Date();
    now.setMinutes(0, 0, 0);
    now.setHours(now.getMinutes() > 0 ? now.getHours() + 1 : now.getHours());
    setDtValue(isoToDateTimeAMPM(now.toISOString()));
    setNotes("");
    setEditingMeeting(null);
    setShowNextMeetingInput(false);
    setNextDtValue({ date: "", hour: "", minute: "", ampm: "AM" });
    setShowSchedule(true);
    setLeadSearch("");
  }
  async function createMeeting() {
    if (!selectedLeadId || !dtValue.date) return alert("Please select lead and date/time");
    const iso = dateTimeAMPMtoISO(dtValue);
    if (!iso) return alert("Please select a valid time (hour/minute).");
    setLoading(true);
    try {
      const res = await fetch("/api/meetings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId: selectedLeadId, datetime: iso, notes }),
      });
      if (!res.ok) {
        const err = await res.json();
        console.error("Create error", err);
        return alert("Failed to create meeting");
      }
      const created: Meeting = await res.json();
      setMeetings((prev) => [...prev, created]);
      setShowSchedule(false);
    } catch (err) {
      console.error(err);
      alert("Network error");
    } finally {
      setLoading(false);
    }
  }
  function startEdit(m: Meeting) {
    setEditingMeeting(m);
    setSelectedLeadId(m.leadId);
    setDtValue(isoToDateTimeAMPM(m.datetime));
    setNotes(m.notes ?? "");
    setShowNextMeetingInput(false);
    setNextDtValue({ date: "", hour: "", minute: "", ampm: "AM" });
    setShowSchedule(true);
    setLeadSearch("");
  }
  async function updateMeeting({ createNext = false }: { createNext?: boolean } = {}) {
    if (!editingMeeting) return;
    if (!dtValue.date) return alert("Please select a valid date and time");
    setLoading(true);
    try {
      const body: Record<string, unknown> = {
        datetime: dateTimeAMPMtoISO(dtValue),
        notes,
      };
      if (createNext && nextDtValue.date) {
        body.nextMeetingDatetime = dateTimeAMPMtoISO(nextDtValue);
      }
      const res = await fetch(`/api/meetings/${editingMeeting.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json();
        console.error("Update error", err);
        return alert("Failed to update meeting");
      }
      // If "create next" also, create next meeting after update
      if (createNext && nextDtValue.date) {
        await fetch("/api/meetings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            leadId: selectedLeadId,
            datetime: dateTimeAMPMtoISO(nextDtValue),
            notes: "", // Start notes blank
          }),
        });
      }
      // Refresh meetings
      const mRes = await fetch("/api/meetings");
      const mData = await mRes.json();
      setMeetings(Array.isArray(mData) ? mData : []);
      setShowSchedule(false);
      setEditingMeeting(null);
      setShowNextMeetingInput(false);
      setNextDtValue({ date: "", hour: "", minute: "", ampm: "AM" });
    } catch (err) {
      console.error(err);
      alert("Network error");
    } finally {
      setLoading(false);
    }
  }
  async function toggleComplete(m: Meeting) {
    setLoading(true);
    try {
      const res = await fetch(`/api/meetings/${m.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !m.completed }),
      });
      if (!res.ok) throw new Error("failed");
      // Refresh meetings
      const mRes = await fetch("/api/meetings");
      setMeetings(await mRes.json());
    } catch (err) {
      console.error(err);
      alert("Failed to toggle completion");
    } finally {
      setLoading(false);
    }
  }
  async function deleteMeeting(m: Meeting) {
    if (!window.confirm("Delete this meeting?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/meetings/${m.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("delete failed");
      setMeetings((prev) => prev.filter((x) => x.id !== m.id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    } finally {
      setLoading(false);
    }
  }

  // --- Swiper breakpoints config ---
  const swiperBreakpoints = {
    320: { slidesPerView: 1, spaceBetween: 8 },
    640: { slidesPerView: 1.1, spaceBetween: 12 },
    768: { slidesPerView: 1.8, spaceBetween: 16 },
    1024: { slidesPerView: 2.8, spaceBetween: 20 },
  };

  // --- UI render ---
  return (
    <div className="p-4 sm:p-6 min-h-screen bg-[var(--color-black)] text-[var(--color-white)]">
      <motion.h1 className="text-2xl sm:text-3xl font-bold mb-6 text-[var(--color-primary)]"
        initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
        Meeting Schedules
      </motion.h1>
      {/* Top controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <input className="flex-1 md:w-80 p-2 rounded-lg bg-[#111] border border-gray-700 placeholder:text-gray-400 outline-none"
            placeholder="Search by lead name, phone or notes..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <Button onClick={() => openScheduleFor()} className="ml-0 md:ml-3">
            <Plus size={16} /> Schedule
          </Button>
          <Button
            onClick={async () => {
              setLoading(true);
              try {
                const [lRes, mRes] = await Promise.all([fetch("/api/leads"), fetch("/api/meetings")]);
                setLeads(await lRes.json());
                setMeetings(await mRes.json());
              } catch {
                // ignore
              } finally {
                setLoading(false);
              }
            }}
            className="ml-0 md:ml-3 bg-[var(--color-secondary)]"
          >
            Refresh
          </Button>
        </div>
        <div className="mt-3 md:mt-0">
          <span className="text-sm text-gray-400 mr-3">Upcoming:</span>
          <span className="font-medium">{upcomingMeeting ? 1 : 0}</span>
        </div>
      </div>

      {/* Swiper carousel for upcoming */}
      <div className="mb-6 overflow-hidden w-100 md:w-200"> 
        <Swiper spaceBetween={16} breakpoints={swiperBreakpoints}
          navigation pagination={{ clickable: true }} autoplay={{ delay: 4500, disableOnInteraction: false }}
          loop={false} freeMode={false} className="overflow-visible" modules={[Navigation, Pagination, Autoplay]} >
          {upcomingMeeting ? (
            <SwiperSlide key={upcomingMeeting.id}>
              {(() => {
                const m = upcomingMeeting;
                const lead = leadById.get(m.leadId);
                return (
                  <motion.div whileHover={{ scale: 1.02 }}
                    className="p-4 rounded-2xl bg-gradient-to-br from-[#0f0f0f] to-[#111] border border-gray-700 min-h-[140px] relative">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{lead?.name ?? "Unknown"}</h3>
                        <p className="text-sm text-gray-400">{lead?.phone}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-300">{shortDateTime12hr(m.datetime)}</div>
                        <div className="text-xs text-gray-500">{new Date(m.datetime).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-gray-300 line-clamp-2">{m.notes ?? "No notes"}</p>
                    <div className="flex gap-2 mt-4">
                      <button onClick={() => startEdit(m)}
                        className="px-3 py-1 rounded-lg bg-[var(--color-primary)] text-black text-sm font-medium">
                        <Edit size={14} /> Edit
                      </button>
                      <button onClick={() => toggleComplete(m)}
                        className="px-3 py-1 rounded-lg bg-[var(--color-success)] text-black text-sm font-medium"
                        title="Mark complete">
                        <Check size={14} /> {m.completed ? "Unmark" : "Complete"}
                      </button>
                      <button onClick={() => deleteMeeting(m)}
                        className="px-3 py-1 rounded-lg bg-red-600 text-white text-sm">
                        <Trash2 size={14} />
                      </button>
                      <div className="ml-auto text-xs text-gray-500">{new Date(m.createdAt).toLocaleDateString()}</div>
                    </div>
                  </motion.div>
                );
              })()}
            </SwiperSlide>
          ) : (
            <SwiperSlide>
              <div className="p-6 bg-[#111] rounded-xl border border-gray-700 min-h-[140px] flex items-center justify-center">
                No upcoming meetings
              </div>
            </SwiperSlide>
          )}
        </Swiper>
      </div>
      {/* Table (desktop) */}
      <div className="hidden md:block mb-6">
        <div className="overflow-x-auto w-full rounded-lg border border-gray-700">
          <table className="w-full min-w-max text-sm">
            <thead className="bg-[#111] text-left">
              <tr>
                <th className="p-2">Lead</th>
                <th className="p-2">Phone</th>
                <th className="p-2">Date / Time</th>
                <th className="p-2">Notes</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMeetings.map((m) => {
                const lead = leadById.get(m.leadId);
                return (
                  <tr key={m.id} className="border-t border-gray-800 hover:bg-[#0b0b0b]">
                    <td className="p-2">{lead?.name ?? "Unknown"}</td>
                    <td className="p-2">{lead?.phone}</td>
                    <td className="p-2">{shortDateTime12hr(m.datetime)}</td>
                    <td className="p-2 max-w-xl">{m.notes ?? "-"}</td>
                    <td className="p-2">
                      {m.completed ? (
                        <span className="text-[var(--color-success)] font-medium">Completed</span>
                      ) : (
                        <span className="text-yellow-300">Pending</span>
                      )}
                    </td>
                    <td className="p-2 flex gap-2">
                      <button onClick={() => startEdit(m)} className="p-2 rounded bg-[var(--color-primary)] text-black">Edit</button>
                      <button onClick={() => toggleComplete(m)} className="p-2 rounded bg-[var(--color-success)] text-black">
                        {m.completed ? "Unmark" : "Complete"}
                      </button>
                      <button onClick={() => deleteMeeting(m)} className="p-2 rounded bg-red-600">Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/* Mobile cards */}
      <div className="grid md:hidden gap-4">
        {filteredMeetings.map((m) => {
          const lead = leadById.get(m.leadId);
          return (
            <motion.div key={m.id} whileHover={{ scale: 1.01 }}
              className="bg-[#111] p-4 rounded-xl border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{lead?.name ?? "Unknown"}</h4>
                  <p className="text-xs text-gray-400">{lead?.phone}</p>
                </div>
                <div className="text-right text-xs">
                  <div>{shortDateTime12hr(m.datetime)}</div>
                  <div className="mt-1">
                    {m.completed ? (
                      <span className="text-[var(--color-success)]">Done</span>
                    ) : (
                      <span className="text-yellow-300">Pending</span>
                    )}
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-300">{m.notes ?? "No notes"}</p>
              <div className="flex gap-2 mt-3">
                <button onClick={() => startEdit(m)} className="flex-1 p-2 rounded bg-[var(--color-primary)] text-black">
                  Edit
                </button>
                <button onClick={() => toggleComplete(m)} className="flex-1 p-2 rounded bg-[var(--color-success)] text-black">
                  {m.completed ? "Unmark" : "Complete"}
                </button>
                <button onClick={() => deleteMeeting(m)} className="flex-1 p-2 rounded bg-red-600 text-white">
                  Delete
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
      {/* Schedule/Edit Modal */}
      {showSchedule && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
          <div className="absolute inset-0 bg-black/60"
            onClick={() => {
              setShowSchedule(false);
              setEditingMeeting(null);
              setShowNextMeetingInput(false);
              setNextDtValue({ date: "", hour: "", minute: "", ampm: "AM" });
            }}
          />
          <motion.div
            initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }}
            className="relative z-50 w-full max-w-2xl bg-[#0b0b0b] rounded-xl p-6 mx-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{editingMeeting ? "Edit Meeting" : "Schedule Meeting"}</h3>
              <button onClick={() => {
                setShowSchedule(false);
                setEditingMeeting(null);
                setShowNextMeetingInput(false);
                setNextDtValue({ date: "", hour: "", minute: "", ampm: "AM" });
              }} className="text-gray-400">
                Close
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Search Lead (Name or Phone)</label>
                <div className="relative">
                  <input type="text"
                         className="w-full p-2 rounded bg-[#111] border border-gray-700 text-sm pr-10"
                         placeholder="Search leads..."
                         value={leadSearch}
                         onChange={(e) => setLeadSearch(e.target.value)}
                         autoComplete="off" />
                  <Search size={16}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                          aria-hidden="true" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Select Lead</label>
                <select className="w-full p-2 rounded bg-[#111] border border-gray-700 text-sm"
                  value={selectedLeadId ?? ""}
                  onChange={(e) => setSelectedLeadId(e.target.value || null)}>
                  <option value="">Select lead</option>
                  {filteredLeads.map((ld) => (
                    <option key={ld._id} value={ld._id}>
                      {ld.name} — {ld.phone}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <DateTimePicker value={dtValue} onChange={setDtValue} label="Date & Time" />
            <div className="mt-4">
              <label className="block text-sm text-gray-300 mb-1">Notes (optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-2 rounded bg-[#111] border border-gray-700 min-h-[80px] text-sm"
              />
            </div>
            {/* Next meeting date/time input */}
            {editingMeeting && (
              <div className="mt-4">
                <label className="flex items-center gap-2 mb-2 cursor-pointer select-none">
                  <input type="checkbox"
                    checked={showNextMeetingInput}
                    onChange={(e) => setShowNextMeetingInput(e.target.checked)}
                    className="accent-[var(--color-accent)] cursor-pointer"
                  />
                  <span className="text-sm text-gray-300">Create Next Meeting</span>
                </label>
                {showNextMeetingInput && (
                  <DateTimePicker value={nextDtValue} onChange={setNextDtValue} label="Next Meeting Date & Time" />
                )}
              </div>
            )}
            <div className="flex items-center gap-3 mt-6 flex-wrap">
              {!editingMeeting ? (
                <Button onClick={createMeeting} className="bg-[var(--color-primary)]">
                  <Calendar size={16} /> Create Meeting
                </Button>
              ) : (
                <>
                  <Button onClick={() => updateMeeting()} className="bg-[var(--color-primary)]">
                    Update Meeting
                  </Button>
                  <Button
                    onClick={() => {
                      if (!showNextMeetingInput) setShowNextMeetingInput(true);
                      else updateMeeting({ createNext: true });
                    }}
                    className="bg-[var(--color-accent)]">
                    Update + Create Next
                  </Button>
                </>
              )}
              <Button
                onClick={() => {
                  setShowSchedule(false);
                  setEditingMeeting(null);
                  setShowNextMeetingInput(false);
                  setNextDtValue({ date: "", hour: "", minute: "", ampm: "AM" });
                }}
                className="bg-[#333]">Cancel</Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Loading indicator */}
      {loading && (
        <div className="fixed bottom-6 right-6 bg-[#111] px-4 py-2 rounded-lg border border-gray-700 text-sm">
          Loading…
        </div>
      )}
    </div>
  );
}
