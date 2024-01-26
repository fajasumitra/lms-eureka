"use client";

import React from "react";
import NavigationMenu from "@/components/navigationMenu";
import prisma from "../../../prisma/prisma";

export default function page() {
  const [nama, setNama] = React.useState("");
  const [judul, setJudul] = React.useState("");
  const [materi, setMateri] = React.useState("");
  const [mataPelajaran, setMataPelajaran] = React.useState("");
  const [isi, setIsi] = React.useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = {
        judul,
        materi,
        mataPelajaran,
        nama,
        isi,
      };

      // Save the data to your Next.js API route
      await fetch("/api/createMateri", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      setJudul("");
      setMateri("");
      setMataPelajaran("");
      setIsi("");
    } catch (error) {
      console.error("Error saving Tugas:", error);
    }
  };

  React.useEffect(() => {
    // Retrieve 'nama' from localStorage when the component mounts
    const storedNama = localStorage.getItem("nama");
    if (storedNama) {
      setNama(storedNama);
    }
  }, []);
  return (
    <>
      <div className="min-h-screen w-screen bg-white">
        <div className="flex">
          <NavigationMenu />
          <div className="ml-28 mt-10">
            <p className="text-3xl font-semibold">Tambahkan Tugas</p>
            <div className="w-full h-1 bg-[#39576C] mt-1" />
            <p className="text-lg mt-1">{nama}</p>
          </div>
        </div>
        <div className="ml-32 mt-16  font-inter w-fit">
          <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-3">
            <label
              htmlFor=""
              className="mr-4 text-xl font-medium text-gray-700"
            >
              Judul
            </label>
            <input
              type="text"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              className="col-span-3 w-full border-2 border-gray-400 focus:border-gray-600 py-1 px-3 rounded-full"
              placeholder="Judul Tugas"
            />

            <label
              htmlFor=""
              className="mr-4 text-xl font-medium text-gray-700"
            >
              Materi Tugas
            </label>
            <input
              type="text"
              value={materi}
              onChange={(e) => setMateri(e.target.value)}
              className="col-span-3 w-full border-2 border-gray-400 focus:border-gray-600 py-1 px-3 rounded-full"
              placeholder="Materi Tugas"
            />

            <label
              htmlFor=""
              className="mr-4 text-xl font-medium text-gray-700"
            >
              Mata Pelajaran
            </label>
            <input
              type="text"
              value={mataPelajaran}
              onChange={(e) => setMataPelajaran(e.target.value)}
              className="col-span-3 w-full border-2 border-gray-400 focus:border-gray-600 py-1 px-3 rounded-full"
              placeholder="Tenggat Waktu"
            />

            <label
              htmlFor=""
              className="mr-4 text-xl font-medium text-gray-700"
            >
              Isi
            </label>
            <textarea
              value={isi}
              onChange={(e) => setIsi(e.target.value)}
              className="col-span-3 w-full border-2 border-gray-400 focus:border-gray-600 py-1 px-3 rounded-lg h-40"
              placeholder="Isi tugas"
              style={{ resize: "none" }}
            />

            <button
              type="submit"
              className="col-span-4 bg-[#DE575A] text-white py-1.5 px-7 rounded-full w-fit justify-self-end mr-5"
            >
              Kirim
            </button>
          </form>
        </div>
      </div>
    </>
  );
}