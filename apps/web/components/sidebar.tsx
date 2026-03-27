'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@ogmj/utils'
import { 
  Command, 
  Building2, 
  Users, 
  Globe, 
  FileText, 
  Megaphone, 
  Zap, 
  BarChart3, 
  Store, 
  Settings,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'

const navigation = [
  { name: 'Command Center', href: '/dashboard', icon: Command },
  { name: 'Business', href: '/business', icon: Building2 },
  { name: 'Clients & Orders', href: '/clients', icon: Users },
  { name: 'Websites & Funnels', href: '/websites', icon: Globe },
  { name: 'Content & Social', href: '/content', icon: FileText },
  { name: 'Ads Manager', href: '/ads', icon: Megaphone },
  { name: 'Automation', href: '/automation', icon: Zap },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Marketplace', href: '/marketplace', icon: Store },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className={cn(
      "flex flex-col bg-black border-r border-gray-800 transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">OG</span>
            </div>
            <span className="text-white font-semibold">OGMJ BRANDS</span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-400 hover:text-white transition-colors p-1"
        >
          {isCollapsed ? <Menu size={16} /> : <X size={16} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200",
                isActive
                  ? "bg-emerald-500/10 text-emerald-400 border-l-2 border-emerald-500"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              )}
            >
              <Icon size={18} />
              {!isCollapsed && (
                <span className="text-sm font-medium">{item.name}</span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">U</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">User</p>
              <p className="text-gray-400 text-xs truncate">user@ogmj.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
