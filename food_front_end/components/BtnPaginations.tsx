import Link from "next/link";

type IPagination = {
  totalPage: number;
  page: number;
  search?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
};

const BtnPaginations = ({
  totalPage = 0,
  page = 0,
  search,
  categoryId,
  minPrice,
  maxPrice,
}: IPagination) => {
  if (totalPage === 0) return null;
  const currentPage = Math.max(1, Math.min(page, totalPage));

  const getPaginationRange = () => {
    if (totalPage <= 3) {
      return Array.from({ length: totalPage }, (_, i) => i + 1);
    }

    let startPage = currentPage - 1;
    let endPage = currentPage + 1;

    if (currentPage <= 1) {
      startPage = 1;
      endPage = 3;
    } else if (currentPage >= totalPage) {
      startPage = totalPage - 2;
      endPage = totalPage;
    }

    const range: (number | string)[] = [];

    if (startPage > 1) {
      range.push("...");
    }
    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }

    if (endPage < totalPage) {
      range.push("...");
    }

    return range;
  };

  const paginationRange = getPaginationRange();

  const createPageLink = (pageNumber: number) => {
    const params = new URLSearchParams();

    params.set("page", String(pageNumber));

    if (search) {
      params.set("search", search);
    }

    if (categoryId) {
      params.set("categoryId", categoryId);
    }

    if (minPrice) {
      params.set("minPrice", String(minPrice));
    }

    if (maxPrice) {
      params.set("maxPrice", String(maxPrice));
    }

    return `?${params.toString()}`;
  };

  return (
    <div className="mt-20 pb-5 gap-2 flex justify-center w-full items-center select-none">
      <div className="flex items-center gap-3 dark:bg-secondary p-2.5 rounded-2xl border border-custom-green text-white">
        {currentPage > 1 ? (
          <Link
            href={createPageLink(currentPage - 1)}
            className="text-custom-green hover:text-white px-1 text-sm font-bold duration-150"
          >
            {"<"}
          </Link>
        ) : (
          <span className="text-zinc-700 px-1 text-sm font-bold cursor-not-allowed">
            {"<"}
          </span>
        )}

        {paginationRange.map((item, idx) => {
          if (item === "...") {
            return (
              <span
                key={`dots-${idx}`}
                className="text-custom-green font-bold px-1 cursor-default"
              >
                ...
              </span>
            );
          }

          return (
            <Link
              key={item}
              href={createPageLink(+item)}
              className={`text-center px-2 py-0.5 text-sm font-medium duration-200 rounded-md ${
                item === currentPage
                  ? "text-white font-bold bg-custom-green scale-105"
                  : "text-zinc-400 hover:text-custom-green"
              }`}
            >
              {item}
            </Link>
          );
        })}

        {currentPage < totalPage ? (
          <Link
            href={createPageLink(currentPage + 1)}
            className="text-custom-green hover:text-white px-1 text-sm font-bold duration-150"
          >
            {">"}
          </Link>
        ) : (
          <span className="text-zinc-700 px-1 text-sm font-bold cursor-not-allowed">
            {">"}
          </span>
        )}
      </div>
    </div>
  );
};

export default BtnPaginations;
