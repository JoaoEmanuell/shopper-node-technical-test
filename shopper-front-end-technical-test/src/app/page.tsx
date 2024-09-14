"use client";

import { HomeComponent } from "@/components/home";
import { CurrentTabContext } from "@/contexts/currentTabContext";
import { CustomerCodeContext } from "@/contexts/customerCodeContext";
import { LastMeasureTypeContext } from "@/contexts/lastMeasureTypeContext";
import { LastMeasureUUIDContext } from "@/contexts/lastMeasureUUIDContext";
import { LastMeasureValueContext } from "@/contexts/lastMeasureValueContext";
import { TouchProvider } from "@/contexts/touchContext";
import { useState } from "react";

export default function Home() {
  const [customerCode, setCustomerCode] = useState("");
  const [lastMeasureUUIDContext, setLastMeasureUUIDContext] = useState("");
  const [lastMeasureValueContext, setLastMeasureValueContext] = useState(0);
  const [currentTabContext, setCurrentTabContext] = useState("init");
  const [lastMeasureTypeContext, setLastMeasureTypeContext] = useState("");

  return (
    <CustomerCodeContext.Provider value={[customerCode, setCustomerCode]}>
      <LastMeasureUUIDContext.Provider
        value={[lastMeasureUUIDContext, setLastMeasureUUIDContext]}
      >
        <LastMeasureValueContext.Provider
          value={[lastMeasureValueContext, setLastMeasureValueContext]}
        >
          <CurrentTabContext.Provider
            value={[currentTabContext, setCurrentTabContext]}
          >
            <LastMeasureTypeContext.Provider
              value={[lastMeasureTypeContext, setLastMeasureTypeContext]}
            >
              <TouchProvider>
                <HomeComponent />
              </TouchProvider>
            </LastMeasureTypeContext.Provider>
          </CurrentTabContext.Provider>
        </LastMeasureValueContext.Provider>
      </LastMeasureUUIDContext.Provider>
    </CustomerCodeContext.Provider>
  );
}
