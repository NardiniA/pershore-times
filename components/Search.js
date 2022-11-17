import { AppContext } from "@/components/UseContext";
import { formatDate } from "@/utils/formatDate";
import { IconX } from "@tabler/icons";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { client } from "@/libs/searchClient";

export default function Search({ tags }) {
  const { toggleSearch } = useContext(AppContext);
  const [searchOpen, setSearchOpen] = toggleSearch;

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchTerm !== "") {
      try {
      client.index("blog").search(searchTerm).then((results) => {
        console.log(results.hits);
        setSearchResults(results.hits);
      });
    } catch (error) {
      console.error(error);
    }
    }
  }, [searchTerm]);

  // search input focus
  searchOpen
    ? setTimeout(() => {
        document.querySelector('[aria-label="search-query"]').focus();
      }, 250)
    : null;

  const resetSearchInput = () => {
    setSearchOpen(!searchOpen);
    setSearchTerm("");
  };

  return (
    <>
      <div
        className={searchOpen ? `search-overlay is-visible` : `search-overlay`}
        onClick={() => resetSearchInput(true)}
      ></div>
      <div
        className={
          searchOpen ? `search-block is-visible` : `search-block is-hidden`
        }
      >
        <div data-toggle="search-close" onClick={() => resetSearchInput(true)}>
          <span className="text-primary">
            <IconX size={38} />
          </span>
        </div>
        <input
          type="text"
          value={searchTerm}
          placeholder="Type to search today.."
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          aria-label="search-query"
        />

        <div className="search-result-block">
          {searchResults.length ? (
            <div className="search-results row g-4 mt-2">
              <p className="h4 mb-0">
                <span className="font-secondary">{searchResults.length} </span>
                {searchResults.length > 1 ? "results" : "result"} found.
              </p>
              {searchResults.map((r, i) => (
                <div
                  key={i}
                  className="search-result-card col-xl-2 col-lg-3 col-sm-4 col-12"
                  onClick={() => resetSearchInput(true)}
                >
                  <Link href={`/today/${r.Slug}`}>
                    <a title={r.Title}>
                      <Image
                        className="rounded"
                        src={r?.Image.url.replace(
                          "https://res.cloudinary.com/antonio-nardini/image/upload",
                          ""
                        )}
                        alt={r.Title}
                        width={`190`}
                        height={`100`}
                        layout="responsive"
                        placeholder="blur"
                        blurDataURL={r?.Image.url.replace(
                          "https://res.cloudinary.com/antonio-nardini/image/upload",
                          ""
                        )}
                      />
                      <span className="d-inline-block mt-2 mb-1 small">
                        {formatDate(r.Date)}
                      </span>
                      <p className="h5 mb-0">{r.Title}</p>
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          ) : searchTerm === "" ? (
            <></>
          ) : (
            <div className="search-results row g-4 mt-2">
              <p className="h3 mt-3 mb-0">No results found!</p>
            </div>
          )}
        </div>

        {tags && (
          <div className="mt-4 pt-3 card-meta">
            <p className="h4 mb-3">See posts by tags</p>
            <ul className="card-meta-tag list-inline">
              {tags.map((item, i) => (
                <li
                  key={i}
                  className="list-inline-item me-1 mb-2"
                  onClick={() => resetSearchInput(true)}
                >
                  <Link href={`/today/tags/${item.slug.toLowerCase()}`}>
                    <a className="small">{item.name}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
