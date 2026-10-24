import React from 'react';
import Link from 'next/link';
import { DamageCategoryMeta } from '@/types';
import { AlertTriangle, ArrowRight, Wrench } from 'lucide-react';

interface DamageCardProps {
  category: DamageCategoryMeta;
}

export default function DamageCard({ category }: DamageCardProps) {
  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0d1424]/80 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/10">
      
      {/* Subtle background glow */}
      <div 
        className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full opacity-20 blur-3xl transition-opacity group-hover:opacity-40"
        style={{ backgroundColor: category.colorHex }}
      />

      <div className="space-y-4">
        {/* Header: Distress Code & Urgency Badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span 
              className="font-mono text-xs font-bold px-2 py-0.5 rounded border"
              style={{ 
                color: category.colorHex,
                borderColor: `${category.colorHex}40`,
                backgroundColor: `${category.colorHex}15`
              }}
            >
              {category.code}
            </span>
            <span className="text-xs text-slate-400 font-mono">RDD Standard</span>
          </div>

          <span
            className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${category.borderColor} ${category.badgeBg} ${category.badgeText}`}
          >
            {category.urgency} Urgency
          </span>
        </div>

        {/* Thumbnail Preview Illustration */}
        <div className="relative h-32 w-full overflow-hidden rounded-xl border border-white/5 bg-[#090d16]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={category.sampleThumbnail} 
            alt={category.name}
            className="h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1424] via-transparent to-transparent opacity-80" />
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
            {category.name}
          </h3>
          <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
            {category.description}
          </p>
        </div>

        {/* Engineering Causes */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
            <span>Primary Cause Factors:</span>
          </div>
          <ul className="space-y-1 pl-4 text-[11px] text-slate-400 list-disc">
            {category.primaryCauses.slice(0, 2).map((cause, i) => (
              <li key={i}>{cause}</li>
            ))}
          </ul>
        </div>

        {/* Typical Repair */}
        <div className="rounded-lg bg-slate-900/60 border border-white/5 p-2.5 text-[11px] text-slate-300 flex items-start gap-2">
          <Wrench className="h-3.5 w-3.5 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-slate-200">Mitigation: </span>
            <span>{category.typicalRepair}</span>
          </div>
        </div>
      </div>

      {/* Footer Link */}
      <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
        <Link
          href={`/detection`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <span>Test in Detection Suite</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
