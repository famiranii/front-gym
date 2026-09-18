"use client";

import { z } from "zod";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import FormInput from "@/components/ui/FormInput";
import InputCard from "@/components/ui/InputCard";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { api } from "@/lib/api";
import { addressSchema } from "@/lib/schemas/address.schema";
import { Address } from "@/types/addressType";
import { useAppSelector } from "@/store/hook";

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

  const userId = useAppSelector((state) => state.users.me?.id);
  const addressId = searchParams.get("id");
  const isEditMode = Boolean(addressId);

  const [loadingAddress, setLoadingAddress] = useState(isEditMode);

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
    if (!addressId || !userId) return;

    const getAddress = async () => {
      try {
        setLoadingAddress(true);

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
        toast.error("دریافت آدرس با خطا مواجه شد");
      } finally {
        setLoadingAddress(false);
      }
    };

    getAddress();
  }, [addressId, userId, reset]);

  const onSubmit = async (data: AddressForm) => {
    if (!userId) {
      toast.error("اطلاعات کاربر دریافت نشد");
      return;
    }

    try {
      if (isEditMode && addressId) {
        await api.put(`/users/${userId}/addresses/${addressId}`, data);

        toast.success("آدرس با موفقیت ویرایش شد");
      } else {
        await api.post(`/users/${userId}/addresses`, data);

        toast.success("آدرس با موفقیت ذخیره شد");
      }

      router.back();
    } catch (error) {
      console.error("Address save error:", error);

      toast.error(
        isEditMode
          ? "ویرایش آدرس با خطا مواجه شد"
          : "ذخیره آدرس با خطا مواجه شد",
      );
    }
  };

  // Loading دریافت آدرس
  if (loadingAddress) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center" dir="rtl">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-primary" />
          <p className="text-sm text-muted-foreground">در حال دریافت آدرس...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex w-full items-center justify-center px-3 sm:px-4"
      dir="rtl"
    >
      <div className="my-8 w-full max-w-xl">
        <InputCard title={isEditMode ? "ویرایش آدرس" : "آدرس"}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
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
                onPlaceSelect={(address) => {
                  setValue("address", address, {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                }}
              />
            </div>
            {/* عنوان و استان */}
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-2">
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
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-2">
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

            {/* آدرس پیش‌فرض */}
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" {...register("is_default")} />
              آدرس پیش‌فرض
            </label>

            {/* دکمه */}
            <PrimaryButton disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  {isEditMode ? "در حال ویرایش..." : "در حال ذخیره..."}
                </span>
              ) : isEditMode ? (
                "ویرایش آدرس"
              ) : (
                "ذخیره آدرس"
              )}
            </PrimaryButton>
          </form>
        </InputCard>
      </div>
    </div>
  );
}
