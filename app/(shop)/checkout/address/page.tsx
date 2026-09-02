"use client";

import { z } from "zod";
import dynamic from "next/dynamic";
import { useForm, useWatch } from "react-hook-form";

import FormInput from "@/components/ui/FormInput";
import InputCard from "@/components/ui/InputCard";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { api } from "@/lib/api";
import { addressSchema } from "@/lib/schemas/address.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const MapPicker = dynamic(
  () => import("@/components/featchers/map/MapPicker"),
  {
    ssr: false,
  },
);

export default function Page() {
  type AddressForm = z.infer<typeof addressSchema>;
  const router = useRouter();

  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const userId = window.localStorage.getItem("id");
    setId(userId);
  }, []);
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressForm>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      title: "",
      province: "",
      city: "",
      address: "",
      postalCode: "",
      isDefault: false,
      latitude: null,
      longitude: null,
    },
  });
  const latitude = useWatch({
    control,
    name: "latitude",
  });

  const longitude = useWatch({
    control,
    name: "longitude",
  });
  const onSubmit = async (data: AddressForm) => {
    try {
      const response = await api.post(`/users/${id}/addresses`, data);

      console.log("Address created:", response);
      router.push("/checkout");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex items-center justify-center">
      <div className="my-8 w-5/6 md:w-1/2">
        <InputCard title="آدرس">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* عنوان و استان */}
            <div className="flex gap-2">
              <FormInput
                label="عنوان آدرس"
                placeholder="مثال: خانه، محل کار"
                {...register("title")}
                error={errors.title?.message}
              />

              <FormInput
                label="استان"
                placeholder="مثال: تهران"
                {...register("province")}
                error={errors.province?.message}
              />
            </div>

            {/* شهر و کد پستی */}
            <div className="flex gap-2">
              <FormInput
                label="شهر"
                placeholder="مثال: تهران"
                {...register("city")}
                error={errors.city?.message}
              />

              <FormInput
                label="کد پستی"
                placeholder="مثال: ۱۲۳۴۵۶۷۸۹۰"
                {...register("postalCode")}
                error={errors.postalCode?.message}
              />
            </div>

            {/* آدرس */}
            <FormInput
              label="آدرس"
              placeholder="خیابان، کوچه، پلاک"
              {...register("address")}
              error={errors.address?.message}
            />

            {/* نقشه */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">
                انتخاب موقعیت روی نقشه
                <span className="mr-1 text-xs text-muted-foreground">
                  (اختیاری)
                </span>
              </label>

              <MapPicker
                value={
                  latitude !== null && longitude !== null
                    ? {
                        lat: latitude,
                        lng: longitude,
                      }
                    : null
                }
                onChange={(location) => {
                  setValue("latitude", location.lat);
                  setValue("longitude", location.lng);
                }}
              />
            </div>

            {/* آدرس پیش‌فرض */}
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" {...register("isDefault")} />
              آدرس پیش‌فرض
            </label>

            <PrimaryButton>ذخیره آدرس</PrimaryButton>
          </form>
        </InputCard>
      </div>
    </div>
  );
}
