import React from "react";

export default function LandDescription({ id, title, description, mapIframe }) {
  if (!title && !description) return null;

  const getCleanMapUrl = (rawInput) => {
    if (!rawInput) return "";

    const trimmed = rawInput.trim();

    if (trimmed.startsWith("http")) {
      return trimmed;
    }

    const match = trimmed.match(/src=["']([^"']+)["']/);

    return match ? match[1] : "";
  };

  const cleanMapSrc = getCleanMapUrl(mapIframe);

  return (
    <section className="mt-8 w-full space-y-8">
      {/* Header */}{" "}
      <div className="space-y-3">
        {" "}
        <h1 className="text-secondary text-2xl leading-snug font-bold md:text-3xl">
          {title}{" "}
        </h1>
        {id && (
          <div className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-4 py-2">
            <span className="text-xs font-semibold tracking-wider text-stone-500 uppercase">
              Mã đất nền:
            </span>

            <span className="mt-[-2px] text-sm font-bold text-stone-800">
              {id}
            </span>
          </div>
        )}
      </div>
      {/* Mô tả */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="bg-primary h-5 w-1 rounded-full" />

          <h2 className="text-primary text-lg font-bold uppercase">
            Thông tin mô tả
          </h2>
        </div>

        <div
          className="rich-content text-sm md:text-base"
          dangerouslySetInnerHTML={{
            __html:
              description?.replace(/&nbsp;/g, " ") ??
              "<p>Chưa có mô tả chi tiết...</p>",
          }}
        />
      </div>
      {/* Bản đồ */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="bg-primary h-5 w-1 rounded-full" />

          <h2 className="text-primary text-lg font-bold uppercase">
            Vị trí trên bản đồ
          </h2>
        </div>

        <div className="overflow-hidden rounded-xl border border-stone-200 shadow-inner">
          {cleanMapSrc ? (
            <iframe
              src={cleanMapSrc}
              className="h-[450px] w-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Apartment Location Map"
            />
          ) : (
            <div className="flex h-[450px] items-center justify-center bg-stone-50">
              <p className="text-sm text-stone-400">
                Chưa có dữ liệu vị trí bản đồ cho dự án này
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
