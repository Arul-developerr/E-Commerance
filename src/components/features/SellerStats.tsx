import React from "react";
import type { LucideIcon } from "lucide-react";

type StatCardProps = { title: string; value: string; change: string; icon: LucideIcon; color: string };

export const StatCard = ({ title, value, change, icon: Icon, color }: StatCardProps) => (
  <div className="bg-brand-surface border border-brand-border p-6 rounded-2xl space-y-4">
    <div className="flex justify-between items-start">
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <span className="text-xs font-bold text-brand-success bg-green-50 px-2 py-1 rounded-full">{change}</span>
    </div>
    <div>
      <p className="text-sm text-brand-text-secondary">{title}</p>
      <h3 className="text-2xl font-bold text-brand-text-primary">{value}</h3>
    </div>
  </div>
);
