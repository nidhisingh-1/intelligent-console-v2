import { AppShell } from "@/components/app-shell"
import { EnumCatalogManager } from "@/components/enums/enum-catalog-manager"

export default function EnumsPage() {
  return (
    <AppShell>
      <div className="attio-container h-full flex flex-col">
        {/* Page Content */}
        <div className="flex-1 overflow-auto py-8">
          <EnumCatalogManager />
        </div>
      </div>
    </AppShell>
  )
}
