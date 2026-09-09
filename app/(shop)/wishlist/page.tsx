"use client";

import { useAppDispatch, useAppSelector } from "@/store/hook";
import { fetchWishlist } from "@/store/slices/wishlistSlice";
import { useEffect } from "react";

export default function Page() {
  const dispatch = useAppDispatch();
  const wishList = useAppSelector((state) => state.wishlist.items);
  console.log(wishList);
  useEffect(() => {
    dispatch(fetchWishlist());
  }, []);
  return <div>Page</div>;
}
