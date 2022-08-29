export default function PaperPagination({ currentPage, numberOfPages, setPageNumber }) {
  const isFirst = currentPage === 1;
  const isLast = currentPage === numberOfPages;

  const handlePrevClick = () => setPageNumber(currentPage - 1);
  const handleNextClick = () => setPageNumber(currentPage + 1);

  if (numberOfPages === 1) return <></>;

  return (
    <>
        <nav className="text-center mt-5">
          <ul className="pagination justify-content-center border border-white rounded d-inline-flex">
            <li className={`page-item ${isFirst ? "disabled" : ""}`}>
              <button className="page-link rounded w-auto px-4" aria-label="Pagination Arrow" onClick={handlePrevClick}>
                  Prev
              </button>
            </li>
            
            {!isFirst  && (
                <li className="page-item page-item-sm-none">
                    <span className="page-link rounded" onClick={() => setPageNumber(currentPage - 1)}>{currentPage - 1}</span>
                </li>
            )}

            <li className="page-item active">
                <span className="page-link rounded">{currentPage}</span>
            </li>
            
            {!isLast && (
                <li className="page-item page-item-sm-none">
                    <span className="page-link rounded" onClick={() => setPageNumber(currentPage + 1)}>{currentPage + 1}</span>
                </li>
            )}

            <li className={`page-item ${isLast ? "disabled" : ""}`}>
              <button className="page-link rounded w-auto px-4" aria-label="Pagination Arrow" onClick={handleNextClick}>
                  Next
              </button>
            </li>
          </ul>
        </nav>
    </>
  );
}
