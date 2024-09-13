"use client";

import { HomeComponent } from "@/components/home";
import { CustomerCodeContext } from "@/contexts/customerCodeContext";
import { useState } from "react";

export default function Home() {
  const [customerCode, setCustomerCode] = useState("");

  return (
    <CustomerCodeContext.Provider value={[customerCode, setCustomerCode]}>
      <HomeComponent />
    </CustomerCodeContext.Provider>
  );
}
