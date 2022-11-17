import { formatDate } from "@/utils/formatDate";
import { readingTime } from "@/utils/readingTime";
import { truncateString } from "@/utils/truncateString";
import { IconCalendarEvent, IconClock } from "@tabler/icons";
import Image from "next/image";
import Link from "next/link";

export default function Post({
  post: {
    attributes: { Title, Slug, Date, Excerpt, Image: { data }, Alt, Body, tags },
  },
}) {
  return (
    <>
      <article className="card post-card h-100 border-0 bg-transparent">
        <div className="card-body">
          <Link href={`/today/${Slug}`}>
            <a className="d-block" title={Title}>
              <div className="post-image position-relative">
                <Image
                  className="rounded"
                  src={data?.attributes.url.replace(
                    "https://res.cloudinary.com/antonio-nardini/image/upload",
                    ""
                  )}
                  alt={Alt}
                  width={data?.attributes.width}
                  height={data?.attributes.height}
                  layout="responsive"
                  placeholder="blur"
                  blurDataURL={data?.attributes.url.replace(
                    "https://res.cloudinary.com/antonio-nardini/image/upload",
                    ""
                  )}
                />
              </div>
            </a>
          </Link>

          <ul className="card-meta list-inline mb-3">
            <li className="list-inline-item mt-2">
              <i className="me-2">
                <IconCalendarEvent size={18} />
              </i>
              <span>{formatDate(Date)}</span>
            </li>
            <li className="list-inline-item mt-2">—</li>
            <li className="list-inline-item mt-2">
              <i className="me-2">
                <IconClock size={18} />
              </i>
              <span>{readingTime(Body)} min read</span>
            </li>
          </ul>

          <Link href={`/today/${Slug}`}>
            <a className="d-block" title={Title}>
              <h3 className="post-title mb-3">{Title}</h3>
            </a>
          </Link>
          <p>{truncateString(Excerpt, 150)}</p>
        </div>
        <div className="card-footer border-top-0 bg-transparent p-0">
          <ul className="card-meta list-inline">
            <li className="list-inline-item mt-2">Tags</li>
            <li className="list-inline-item mt-2">•</li>
            <li className="list-inline-item mt-2">
              <ul className="card-meta-tag list-inline">
                {tags?.data.map((t, i) => (
                  <li key={i} className="list-inline-item small">
                    <Link href={`/today/tags/${t?.attributes.Slug.toLowerCase()}`}>
                      <a>{t?.attributes.Name}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </article>
    </>
  );
}
