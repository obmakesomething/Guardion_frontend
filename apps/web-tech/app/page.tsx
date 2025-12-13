"use client";

import React, { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.location.href = "/jobs";
  }, []);
  return null;
}
