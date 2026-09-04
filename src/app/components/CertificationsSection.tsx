"use client";

import Image from "next/image";
import { Award, ExternalLink, X } from "lucide-react";
import certifications from "../data/certifications.json";
import { useState, memo } from "react";

type Cert = (typeof certifications)[number];

const categoryStyle: Record<
  string,
  { gradient: string; badgeClass: string }
> = {
  "Data & Analytics": {
    gradient: "from-violet-700 via-indigo-800 to-slate-900",
    badgeClass: "bg-violet-400/25 border-violet-300/40 text-violet-100",
  },
  "Data Science & AI": {
    gradient: "from-purple-700 via-indigo-800 to-slate-900",
    badgeClass: "bg-purple-400/25 border-purple-300/40 text-purple-100",
  },
  "Artificial Intelligence": {
    gradient: "from-fuchsia-700 via-purple-900 to-slate-900",
    badgeClass: "bg-fuchsia-400/25 border-fuchsia-300/40 text-fuchsia-100",
  },
  Programming: {
    gradient: "from-cyan-600 via-blue-800 to-slate-900",
    badgeClass: "bg-cyan-400/25 border-cyan-300/40 text-cyan-100",
  },
  "IoT & Embedded": {
    gradient: "from-emerald-600 via-teal-800 to-slate-900",
    badgeClass: "bg-emerald-400/25 border-emerald-300/40 text-emerald-100",
  },
  Security: {
    gradient: "from-rose-600 via-red-800 to-slate-900",
    badgeClass: "bg-rose-400/25 border-rose-300/40 text-rose-100",
  },
  "Web Development": {
    gradient: "from-amber-500 via-orange-700 to-slate-900",
    badgeClass: "bg-amber-400/25 border-amber-300/40 text-amber-100",
  },
};

const defaultStyle = {
  gradient: "from-slate-600 via-slate-700 to-slate-900",
  badgeClass: "bg-slate-400/25 border-slate-300/40 text-slate-100",
};

export function CertificateCard({
  cert,
  index,
}: {
  cert: Cert;
  index: number;
}) {
  const certImage = (cert as { image?: string }).image;
  const [imgError, setImgError] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const style = categoryStyle[cert.category] ?? defaultStyle;

  const hasValidImage = Boolean(certImage && certImage.trim() !== "" && !imgError);

  return (
    <div
      onClick={() => setShowDescription(!showDescription)}
      className="
        group relative w-full min-w-0 max-w-full aspect-[4/3] rounded-none overflow-hidden cursor-pointer
        border border-black/15 dark:border-white/15 bg-black/5 dark:bg-white/5
        transition-all duration-300 ease-out
        hover:border-slate-500/50 dark:hover:border-slate-400/50 hover:shadow-xl
        select-none
      "
    >
      {/* PHOTO IMAGE SLOT (rendered if image path is provided) */}
      {hasValidImage ? (
        <Image
          src={certImage!}
          alt={cert.title}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className={`object-cover transition-transform duration-500 ease-out ${showDescription
            ? "scale-105 filter blur-[2px] brightness-50 dark:brightness-40"
            : "group-hover:scale-105"
            }`}
          onError={() => setImgError(true)}
        />
      ) : (
        /* Certificate Art Background Fallback */
        <div
          className={`absolute inset-0 bg-gradient-to-br ${style.gradient} transition-all duration-500 ${showDescription ? "scale-105 brightness-50" : "group-hover:scale-105"
            }`}
        >
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(255,255,255,1) 40px)," +
                "repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(255,255,255,1) 40px)",
            }}
          />
          <div className="absolute bottom-4 right-4 w-14 h-14 rounded-full border-2 border-white/15 flex items-center justify-center opacity-25">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/20" />
        </div>
      )}

      {/* Scrim Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Default State */}
      {!showDescription && (
        <div className="absolute inset-0 p-4 flex flex-col justify-between z-10 pointer-events-none">
          <div className="flex justify-between items-center w-full">
            <span className="px-2.5 py-0.5 rounded-none text-[10px] font-mono font-bold bg-black/50 text-white/90 border border-white/20 backdrop-blur-sm shadow-sm">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-[10px] font-mono bg-black/50 text-white/80 border border-white/20 px-2 py-0.5 rounded-none backdrop-blur-sm shadow-sm font-semibold">
              Click for info
            </span>
          </div>

          <div>
            <h3 className="text-sm sm:text-base font-bold text-white drop-shadow-sm leading-tight font-sans">
              {cert.title}
            </h3>
            <span className="text-[11px] font-mono text-white/70 mt-0.5 block">
              {cert.issuer} · {cert.date}
            </span>
          </div>
        </div>
      )}

      {/* Clicked State: Detail Overlay */}
      {showDescription && (
        <div className="absolute inset-0 p-4 bg-white/95 text-gray-900 dark:bg-black/90 dark:text-white backdrop-blur-md flex flex-col justify-between z-20 border border-black/10 dark:border-white/10 animate-fadeIn">
          <div className="space-y-2 min-w-0 max-w-full">
            <div className="flex items-start justify-between gap-2 border-b border-black/10 dark:border-white/15 pb-2">
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-snug font-sans">
                  {cert.title}
                </h3>
                <p className="text-[11px] font-mono text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                  {cert.issuer} · {cert.date}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDescription(false);
                }}
                className="p-1 rounded-none bg-black/10 hover:bg-black/20 text-gray-800 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white/80 shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-xs text-gray-700 dark:text-gray-200 leading-relaxed font-sans min-w-0 max-w-full break-words line-clamp-4">
              {cert.description}
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-black/10 dark:border-white/15 min-w-0 max-w-full">
            {cert.skills && cert.skills.length > 0 && (
              <div className="flex flex-wrap gap-1 min-w-0 max-w-full">
                {cert.skills.slice(0, 5).map((skill, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 text-[9px] font-mono rounded-none bg-black/5 text-gray-800 border border-black/15 dark:bg-white/10 dark:text-gray-200 dark:border-white/15 truncate"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}

            {cert.credentialUrl && cert.credentialUrl !== "#" && (
              <div className="pt-1">
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-none text-xs font-mono font-medium bg-slate-900 text-white hover:bg-slate-800 dark:bg-emerald-500 dark:text-black dark:hover:bg-emerald-400 transition-colors"
                >
                  <Award className="w-3 h-3" />
                  <span>View Credential</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function CertificationsSection() {
  return (
    <section className="w-full min-w-0 max-w-full py-1" id="certifications">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full min-w-0 max-w-full">
        {certifications.map((cert, index) => (
          <CertificateCard key={index} cert={cert} index={index} />
        ))}
      </div>
    </section>
  );
}

export default memo(CertificationsSection);
