type PaginationMeta = {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
};

type PaginationProps = {
    meta?: PaginationMeta;
    onPageChange: (page: number) => void;
};

export function Pagination({ meta, onPageChange }: PaginationProps) {
    if (!meta) return null;

    const { page, totalPages, hasNextPage, hasPrevPage } = meta;

    const getPages = () => {
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const pages: number[] = [];
        pages.push(1);

        if (page > 3) {
            pages.push(-1);
        }

        const start = Math.max(2, page - 1);
        const end = Math.min(totalPages - 1, page + 1);

        for (let p = start; p <= end; p++) {
            pages.push(p);
        }

        if (page < totalPages - 2) {
            pages.push(-2);
        }

        pages.push(totalPages);

        return pages;
    };

    const pages = getPages();

    return (
        <div className="p-6 border-t border-gray-200">
            <div className="flex items-center justify-end gap-2">
                {/* Previous */}
                <button
                    disabled={!hasPrevPage}
                    onClick={() => hasPrevPage && onPageChange(page - 1)}
                    className={`px-4 py-2 border border-gray-300 rounded-lg font-medium text-sm transition-colors
            ${hasPrevPage
                            ? "text-gray-700 hover:bg-gray-50 cursor-pointer"
                            : "text-gray-400 bg-gray-100 cursor-not-allowed"
                        }`}
                >
                    ← Previous
                </button>

                {/* Page numbers */}
                {pages.map((p, index) =>
                    p < 0 ? (
                        <span key={index} className="px-2 text-gray-500">
                            ...
                        </span>
                    ) : (
                        <button
                            key={p}
                            onClick={() => onPageChange(p)}
                            className={`w-10 h-10 rounded-lg font-medium text-sm transition-colors
                ${p === page
                                    ? "bg-blue-600 text-white"
                                    : "text-gray-700 hover:bg-gray-100"
                                }`}
                        >
                            {p}
                        </button>
                    )
                )}

                {/* Next */}
                <button
                    disabled={!hasNextPage}
                    onClick={() => hasNextPage && onPageChange(page + 1)}
                    className={`px-4 py-2 border border-gray-300 rounded-lg font-medium text-sm transition-colors
            ${hasNextPage
                            ? "text-gray-700 hover:bg-gray-50 cursor-pointer"
                            : "text-gray-400 bg-gray-100 cursor-not-allowed"
                        }`}
                >
                    Next →
                </button>
            </div>
        </div>
    );
}
