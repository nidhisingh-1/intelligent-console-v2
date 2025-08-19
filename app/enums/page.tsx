import { AppShell } from "@/components/app-shell"
import { EnumCatalogManager } from "@/components/enums/enum-catalog-manager"

export default function EnumsPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Enum Catalog Manager</h1>
          <p className="text-muted-foreground">Manage and organize quality assurance enumeration codes.</p>
        </div>

        <EnumCatalogManager />
      </div>
    </AppShell>
  )
}
