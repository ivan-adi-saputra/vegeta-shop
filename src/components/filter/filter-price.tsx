// components
import { Input } from "@/components/ui/input";

import React, { useState, useEffect } from "react";
interface Price {
  min?: number | undefined;
  max?: number | undefined;
}

interface FilterPrice {
  value: Price;
  onChange: (price: Price) => void;
}

const FilterPrice: React.FC<FilterPrice> = ({ value, onChange }) => {
  const [price, setPrice] = useState(value);

  useEffect(() => {
    if (price) onChange(price);
  }, [price]);

  return (
    <>
      <div className="text-base">Harga Minimum</div>
      <div className="my-4 relative">
        <Input
          className="w-full"
          type="text"
          placeholder=""
          prefix="text-Rp"
          onChange={(e) => {
            setPrice({
              ...price,
              min: parseInt(e.target.value),
            });
          }}
          value={price?.min}
        />
      </div>
      <div className="text-base">Harga Maksimum</div>
      <div className="my-4 relative">
        <Input
          className="w-full"
          type="text"
          placeholder=""
          prefix="text-Rp"
          onChange={(e) => {
            setPrice({ ...price, max: parseInt(e.target.value) });
          }}
          value={price?.max}
        />
      </div>
    </>
  );
};

export default FilterPrice;
