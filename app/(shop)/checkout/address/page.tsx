"use client";

import { z } from "zod";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import FormInput from "@/components/ui/FormInput";
import InputCard from "@/components/ui/InputCard";
import PrimaryButton from "@/components/ui/PrimaryButton";

import { api } from "@/lib/api";
import { addressSchema } from "@/lib/schemas/address.schema";
import { Address } from "@/types/addressType";

const MapPicker = dynamic(
  () => import("@/components/featchers/map/MapPicker"),
  {
    ssr: false,
  },
);

type AddressForm = z.infer<typeof addressSchema>;

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const addressId = searchParams.get("id");
  const isEditMode = Boolean(addressId);

  const {
    register,
    control,
    setValue,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddressForm>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      title: "",
      province: "",
      city: "",
      address: "",
      postal_code: "",
      is_default: false,
      lat: null,
      lng: null,
    },
  });

  const lat = useWatch({
    control,
    name: "lat",
  });

  const lng = useWatch({
    control,
    name: "lng",
  });

  // دریافت آدرس در حالت ویرایش
  useEffect(() => {
    if (!addressId) return;

    const getAddress = async () => {
      const userId = localStorage.getItem("id");

      if (!userId) {
        console.error("User ID not found");
        return;
      }

      try {
        const address: Address = await api.get(
          `/users/${userId}/addresses/${addressId}`,
        );

        reset({
          title: address.title ?? "",
          province: address.province ?? "",
          city: address.city ?? "",
          address: address.address ?? "",
          postal_code: address.postal_code ?? "",
          is_default: address.is_default ?? false,
          lat: address.lat ?? null,
          lng: address.lng ?? null,
        });
      } catch (error) {
        console.error("Get address error:", error);
      }
    };

    getAddress();
  }, [addressId, reset]);

  const onSubmit = async (data: AddressForm) => {
    const userId = localStorage.getItem("id");

    if (!userId) {
      console.error("User ID not found");
      return;
    }

    try {
      if (isEditMode && addressId) {
        // ویرایش
        const response = await api.put(
          `/users/${userId}/addresses/${addressId}`,
          data,
        );

        console.log("Address updated:", response);
      } else {
        // ایجاد
        const response = await api.post(`/users/${userId}/addresses`, data);

        console.log("Address created:", response);
      }

      router.push("/checkout");
    } catch (error) {
      console.error("Address save error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="my-8 w-5/6 md:w-1/2">
        <InputCard title={isEditMode ? "ویرایش آدرس" : "آدرس"}>
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
                {...register("postal_code")}
                error={errors.postal_code?.message}
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
                  lat !== null && lng !== null
                    ? {
                        lat,
                        lng,
                      }
                    : null
                }
                onChange={(location) => {
                  setValue("lat", location.lat, {
                    shouldDirty: true,
                    shouldValidate: true,
                  });

                  setValue("lng", location.lng, {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                }}
              />
            </div>

            {/* آدرس پیش‌فرض */}
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" {...register("is_default")} />
              آدرس پیش‌فرض
            </label>

            {/* دکمه */}
            <PrimaryButton>
              {isSubmitting
                ? "در حال ذخیره..."
                : isEditMode
                  ? "ویرایش آدرس"
                  : "ذخیره آدرس"}
            </PrimaryButton>
          </form>
        </InputCard>
      </div>
    </div>
  );
}
