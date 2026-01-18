import { Home, LayoutDashboard, Briefcase, Bell, Settings, LogOut } from "lucide-react"
import { useLocation } from "wouter"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar"
import logoImg from "@/assets/logo.png"

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Alerts",
    url: "/alerts",
    icon: Bell,
  },
  {
    title: "Personal Portfolio",
    url: "/portfolio",
    icon: Briefcase,
  },
]

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar className="border-r border-purple-900/20 bg-black/50 backdrop-blur-xl">
      <SidebarHeader className="p-4 border-b border-purple-900/20">
        <div className="flex items-center gap-3">
          <img src={logoImg} alt="Echo Swap" className="w-8 h-8 object-contain" />
          <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
            Echo Swap
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-purple-400/50 uppercase text-[10px] font-bold tracking-widest px-4 mb-2">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location === item.url}
                    className={`transition-all duration-300 ${
                      location === item.url 
                        ? 'bg-cyan-500/10 text-cyan-400 border-r-2 border-cyan-500' 
                        : 'text-gray-400 hover:text-cyan-300 hover:bg-white/5'
                    }`}
                  >
                    <a href={item.url} className="flex items-center gap-3 py-6 px-4">
                      <item.icon size={20} className={location === item.url ? 'text-cyan-400' : 'text-gray-500'} />
                      <span className="font-medium">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-purple-900/20">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-gray-500 hover:text-red-400 hover:bg-red-500/5 transition-colors">
              <LogOut size={18} />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
