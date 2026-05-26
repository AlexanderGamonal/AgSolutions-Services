import type { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: number
  icon: LucideIcon
  color: 'blue' | 'green' | 'yellow' | 'gray'
}

const colorMap = {
  blue: 'text-blue-400 bg-blue-400/10',
  green: 'text-emerald-400 bg-emerald-400/10',
  yellow: 'text-yellow-400 bg-yellow-400/10',
  gray: 'text-gray-400 bg-gray-400/10',
}

export function StatsCard({ title, value, icon: Icon, color }: StatsCardProps) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-gray-400 text-sm">{title}</p>
        <div className={`p-2 rounded-lg ${colorMap[color]}`}>
          <Icon size={18} />
        </div>
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  )
}
