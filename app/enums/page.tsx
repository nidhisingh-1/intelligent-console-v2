import { AppShell } from "@/components/app-shell"
import { EnumCatalogManager } from "@/components/enums/enum-catalog-manager"

export default function EnumsPage() {
  return (
    <AppShell>
      <div className="attio-container h-full flex flex-col">
        {/* Page Header */}
        <div className="attio-page-header">
          <h1 className="attio-heading-1">Enum Catalog</h1>
          <p className="attio-body mt-2">Manage and organize quality assurance enumeration codes</p>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <EnumCatalogManager />
        </div>
      </div>
    </AppShell>
  )
}
