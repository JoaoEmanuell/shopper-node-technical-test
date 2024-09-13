"use client";

import { HomeComponent } from "@/components/home";
import { CustomerCodeContext } from "@/contexts/customerCodeContext";
import { LastMeasureUUIDContext } from "@/contexts/lastMeasureUUIDContext";
import { LastMeasureValueContext } from "@/contexts/lastMeasureValueContext";
import { useState } from "react";

export default function Home() {
  const [customerCode, setCustomerCode] = useState("");
  const [lastMeasureUUIDContext, setLastMeasureUUIDContext] = useState("");
  const [lastMeasureValueContext, setLastMeasureValueContext] = useState(0);

  return (
    <CustomerCodeContext.Provider value={[customerCode, setCustomerCode]}>
      <LastMeasureUUIDContext.Provider
        value={[lastMeasureUUIDContext, setLastMeasureUUIDContext]}
      >
        <LastMeasureValueContext.Provider
          value={[lastMeasureValueContext, setLastMeasureValueContext]}
        >
          <HomeComponent />
        </LastMeasureValueContext.Provider>
      </LastMeasureUUIDContext.Provider>
    </CustomerCodeContext.Provider>
  );
}
