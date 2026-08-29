"use client";

import MobileBuyBar from "./MobileBuyBar";


export default function MobileBuyBarWrapper({ price }: { price: number }) {
  return (
    <MobileBuyBar
      price={price}
      onBuy={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    />
  );
}
