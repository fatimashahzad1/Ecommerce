import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"

export interface PaginationProps {
    page: number
    pageCount: number
    onPageChange: (page: number) => void
    className?: string
}

export function Pagination({ page, pageCount, onPageChange, className }: PaginationProps) {
    if (pageCount <= 1) return null

    // Windowed page numbers (show first, last, current +/- 2, ellipsis)
    const window = 2
    let start = Math.max(1, page - window)
    let end = Math.min(pageCount, page + window)
    if (pageCount > 7) {
        if (page <= 4) {
            start = 1
            end = 5
        } else if (page >= pageCount - 3) {
            start = pageCount - 4
            end = pageCount
        }
    } else {
        start = 1
        end = pageCount
    }
    const pageNumbers = []
    if (start > 1) {
        pageNumbers.push(1)
        if (start > 2) pageNumbers.push("...")
    }
    for (let i = start; i <= end; i++) {
        if (i === 1 || i === pageCount) continue
        pageNumbers.push(i)
    }
    if (end < pageCount) {
        if (end < pageCount - 1) pageNumbers.push("...")
        pageNumbers.push(pageCount)
    }

    return (
        <nav
            className={cn("flex items-center justify-center gap-1 mt-8", className)}
            aria-label="Pagination"
        >
            <button
                className="h-9 w-9 flex items-center justify-center rounded-md border bg-background px-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground disabled:opacity-50"
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
                aria-label="Previous page"
                type="button"
            >
                <ChevronLeft className="h-4 w-4" />
            </button>
            {pageNumbers.map((num, idx) =>
                num === "..." ? (
                    <span key={"ellipsis-" + idx} className="px-2 select-none text-muted-foreground">...</span>
                ) : (
                    <button
                        key={num}
                        className={cn(
                            "h-9 w-9 flex items-center justify-center rounded-md border px-2 text-sm font-medium",
                            page === num
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-background text-muted-foreground hover:bg-accent hover:text-foreground border"
                        )}
                        onClick={() => onPageChange(Number(num))}
                        aria-current={page === num ? "page" : undefined}
                        aria-label={`Page ${num}`}
                        type="button"
                    >
                        {num}
                    </button>
                )
            )}
            <button
                className="h-9 w-9 flex items-center justify-center rounded-md border bg-background px-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground disabled:opacity-50"
                onClick={() => onPageChange(page + 1)}
                disabled={page === pageCount}
                aria-label="Next page"
                type="button"
            >
                <ChevronRight className="h-4 w-4" />
            </button>
        </nav>
    )
} 