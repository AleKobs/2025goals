import { Sparkles } from 'lucide-react'

export function Logo() {
  return (
    <div className="flex items-center justify-center space-x-2">
      <Sparkles className="h-6 w-6 text-pink-500" />
      <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
        Metas 2025
      </span>
    </div>
  )
}

