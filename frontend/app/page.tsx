"use client";
import { useEffect, useState } from "react";
import api from "../lib/api";

export default function Home() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    api
      .get("/api/hello/")
      .then((res) => setMsg(res.data.message))
      .catch((err) => setMsg("Error: " + err.message));
  }, []);

  return <div className="min-h-screen flex items-center justify-center">{msg || "Loading..."}</div>;
}
