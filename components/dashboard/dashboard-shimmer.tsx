"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function DashboardShimmer() {
  return (
    <div className="space-y-8">
      {/* Header Shimmer */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Skeleton className="h-6 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
      </div>

      {/* Filters Shimmer */}
      <div className="flex flex-wrap gap-3 items-center">
        <Skeleton className="h-9 w-40" />
        <Skeleton className="h-9 w-32" />
        <Skeleton className="h-9 w-36" />
        <Skeleton className="h-9 w-32" />
        <Skeleton className="h-9 w-64 ml-auto" />
      </div>

      {/* Table Shimmer */}
      <Card className="bg-card/80 backdrop-blur-sm border border-border/50">
        <CardContent>
          <div className="w-full overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow className="bg-secondary/60 backdrop-blur-sm">
                  <TableHead className="min-w-[300px] py-3 px-4">
                    <Skeleton className="h-4 w-24" />
                  </TableHead>
                  <TableHead className="min-w-[100px] py-3 px-4">
                    <Skeleton className="h-4 w-20" />
                  </TableHead>
                  <TableHead className="min-w-[200px] py-3 px-4">
                    <Skeleton className="h-4 w-16" />
                  </TableHead>
                  <TableHead className="min-w-[100px] py-3 px-4">
                    <Skeleton className="h-4 w-16" />
                  </TableHead>
                  <TableHead className="min-w-[100px] py-3 px-4">
                    <Skeleton className="h-4 w-20" />
                  </TableHead>
                  <TableHead className="min-w-[120px] py-3 px-4">
                    <Skeleton className="h-4 w-18" />
                  </TableHead>
                  <TableHead className="min-w-[100px] py-3 px-4">
                    <Skeleton className="h-4 w-18" />
                  </TableHead>
                  <TableHead className="min-w-[120px] py-3 px-4">
                    <Skeleton className="h-4 w-24" />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 10 }).map((_, index) => (
                  <TableRow key={index} className="hover:bg-muted/50">
                    <TableCell className="py-3 px-4">
                      <div className="max-w-[300px] space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-3 w-32" />
                      </div>
                    </TableCell>
                    <TableCell className="text-center py-3 px-4">
                      <Skeleton className="h-6 w-12 mx-auto rounded-full" />
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        <Skeleton className="h-5 w-16 rounded-full" />
                        <Skeleton className="h-5 w-20 rounded-full" />
                        <Skeleton className="h-5 w-14 rounded-full" />
                      </div>
                    </TableCell>
                    <TableCell className="text-center py-3 px-4">
                      <Skeleton className="h-6 w-8 mx-auto rounded-full" />
                    </TableCell>
                    <TableCell className="text-center py-3 px-4">
                      <Skeleton className="h-6 w-8 mx-auto rounded-full" />
                    </TableCell>
                    <TableCell className="text-center py-3 px-4">
                      <Skeleton className="h-4 w-20 mx-auto" />
                    </TableCell>
                    <TableCell className="text-center py-3 px-4">
                      <Skeleton className="h-8 w-20 mx-auto rounded" />
                    </TableCell>
                    <TableCell className="text-center py-3 px-4">
                      <Skeleton className="h-4 w-8 mx-auto" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
