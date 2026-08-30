interface AppShellProps {
  children: React.ReactNode
}

function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {children}
    </div>
  )
}

export default AppShell