type PriceProp = {
  final_price: number;
  discount: number;
  price: number;
};

export default function PriceComponent({
  final_price,
  discount,
  price,
}: PriceProp) {
  return (
    <div className="text-left text-lg flex flex-col items-end gap-0.5">
      {/* قیمت نهایی */}
      <div className="flex items-baseline gap-1">
        <span className=" font-extrabold text-foreground">
          {final_price.toLocaleString("fa-IR")}
        </span>

        <span className=" text-muted-foreground">تومان</span>
      </div>

      {/* قیمت قبل از تخفیف */}
      {discount > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground line-through">
            {price.toLocaleString("fa-IR")}
          </span>

          <span className="rounded-full bg-destructive/10 px-1.5 py-0.5 text-[10px] font-bold text-destructive">
            {discount}٪
          </span>
        </div>
      )}
    </div>
  );
}
