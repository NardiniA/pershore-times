import Link from "next/link";

export default function Pagination({ currentPage, numberOfPages, dir }) {
  const isFirst = currentPage === 1;
  const isLast = currentPage === numberOfPages;

  if (numberOfPages === 1) return <></>;

  return (
    <>
      <div className="col-12">
        <nav className="text-center mt-5">
          <ul className="pagination justify-content-center border border-white rounded d-inline-flex">
            <li className={`page-item ${isFirst ? "disabled" : ""}`}>
              <Link href={`/${dir}/page/${currentPage - 1}`}>
                <a
                  className="page-link rounded w-auto px-4"
                  aria-label="Pagination Arrow"
                >
                  Prev
                </a>
              </Link>
            </li>

            {Array.from({ length: numberOfPages }, (_, i) => (
              <li
                key={i}
                className={`page-item ${i == currentPage - 1 ? "active" : ""}`}
              >
                <Link href={`/${dir}/page/${i + 1}`} key={`page-${i}`}>
                  <a className="page-link rounded">{i + 1}</a>
                </Link>
              </li>
            ))}

            <li className={`page-item ${isLast ? "disabled" : ""}`}>
              <Link href={`/${dir}/page/${currentPage + 1}`}>
                <a
                  className="page-link rounded w-auto px-4"
                  aria-label="Pagination Arrow"
                >
                  Next
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
