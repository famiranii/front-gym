"use client";

import { FieldCell } from "@/components/featchers/admin/FieldCell";
import { SearchBar } from "@/components/ui/UserSearchBar";
import { api } from "@/lib/api";
import Link from "next/link";
import { useEffect, useState } from "react";

type User = {
  id: string;
  full_name: string;
  phone: string;
  created_at: string;
};

export default function Page() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [q, setQ] = useState("");

  useEffect(() => {
    if (!q.trim()) {
      setUsers([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await api.get<User[]>(
          `/users/search?q=${encodeURIComponent(q)}`,
        );
        setUsers(data);
      } finally {
        setLoading(false);
      }
    }, 400); // 400ms debounce

    return () => clearTimeout(timer);
  }, [q]);
  useEffect(() => {
    api
      .get<User[]>("/users")
      .then(setUsers)
      .catch(() => setError("دریافت مشتری‌ها انجام نشد."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main dir="rtl" className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                group
              </span>
              <h1 className="text-2xl font-bold text-foreground">مشتری‌ها</h1>
            </div>
            <div className="my-4">
              <SearchBar onSearch={setQ} placeholder="جستجوی نام یا شماره..." />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              لیست مشتری‌های فروشگاه
            </p>
          </div>

          {!loading && !error && (
            <div className="rounded-xl border border-border bg-card px-4 py-2">
              <span className="text-sm text-muted-foreground">
                تعداد مشتری‌ها
              </span>
              <span className="mr-2 font-semibold text-primary">
                {users.length}
              </span>
            </div>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
            <div className="space-y-4 p-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-14 animate-pulse rounded-xl bg-secondary"
                />
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="mt-8 rounded-2xl border border-destructive/20 bg-destructive/5 p-8 text-center">
            <span className="material-symbols-outlined text-4xl text-destructive">
              error
            </span>
            <p className="mt-3 text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && users.length === 0 && (
          <div className="mt-8 rounded-2xl border border-border bg-card px-6 py-16 text-center">
            <span className="material-symbols-outlined text-5xl text-muted-foreground/30">
              group_off
            </span>
            <h2 className="mt-4 font-semibold">مشتری‌ای وجود ندارد</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              هنوز هیچ مشتری‌ای ثبت‌نام نکرده است.
            </p>
          </div>
        )}

        {/* Table */}
        {!loading && !error && users.length > 0 && (
          <div>
            <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <div className="hidden grid-cols-[70px_1.5fr_1fr_2fr] gap-4 border-b border-border bg-secondary/40 px-6 py-4 text-sm font-medium text-muted-foreground md:grid">
                <div>#</div>
                <div>نام و نام خانوادگی</div>
                <div>شماره تلفن</div>
                <div>ID</div>
              </div>
              <div className="divide-y divide-border">
                {users.map((user, index) => (
                  <Link href={`/admin/customers/${user.id}`} key={user.id}>
                    <div className="group px-5 py-5 transition-colors hover:bg-secondary/30 md:grid md:grid-cols-[70px_1.5fr_1fr_2fr] md:items-center md:gap-4 md:px-6">
                      <div className="hidden text-sm text-muted-foreground md:block">
                        {index + 1}
                      </div>

                      {/* Name */}
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                          <span className="material-symbols-outlined text-primary">
                            person
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-medium text-foreground">
                            {user.full_name}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground md:hidden">
                            مشتری #{index + 1}
                          </p>
                        </div>
                      </div>

                      <FieldCell label="شماره تلفن" value={user.phone} />
                      <FieldCell label="شناسه مشتری" value={user.id} mono ltr />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
