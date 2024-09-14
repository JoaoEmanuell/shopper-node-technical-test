"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CustomerCodeContext } from "@/contexts/customerCodeContext";
import { useContext } from "react";

export const GetCustomerCode = () => {
  const [customerCode, setCustomerCode] = useContext(CustomerCodeContext);
  return (
    <div>
      <Label className="" htmlFor="customerInput">
        Primeiramente, diga qual o seu código de cliente?
      </Label>
      <div className="mt-4">
        <Input
          id="customerInput"
          type="text"
          onBlur={(input) => {
            setCustomerCode(input.target.value);
          }}
          defaultValue={customerCode}
          required
          minLength={1}
        />
      </div>
    </div>
  );
};
