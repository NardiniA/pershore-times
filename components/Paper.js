import { formatDatePapers } from "@/utils/formatDate";
import { IconCalendarEvent, IconNews } from "@tabler/icons";
import Image from "next/image";
import Link from "next/link";

export default function Paper({
  paper: {
    slug,
    frontMatter: { issue, title, date },
  },
}) {
  return (
    <>
      <article className="card post-card h-100 border-0 bg-transparent">
        <div className="card-body">
          <Link href={`/newspapers/${slug}`}>
            <a className="d-block" title={title}>
              <div className="post-image position-relative">
                <Image
                  className="rounded"
                  src="/v1661166006/01_dlpnuc.png"
                  alt={title}
                  width={`790`}
                  height={`500`}
                  layout="responsive"
                  placeholder="blur"
                  blurDataURL="/v1661166006/01_dlpnuc.png"
                />
              </div>
            </a>
          </Link>

          <ul className="card-meta list-inline mb-3">
            <li className="list-inline-item mt-2">
              <i className="me-2">
                <IconCalendarEvent size={18} />
              </i>
              <span>{formatDatePapers(date)}</span>
            </li>
            <li className="list-inline-item mt-2">—</li>
            <li className="list-inline-item mt-2">
              <i className="me-2">
                <IconNews size={18} />
              </i>
              <span>Issue {issue + ""}</span>
            </li>
          </ul>

          <Link href={`/newspapers/${slug}`}>
            <a className="d-block" title={title}>
              <h3 className="post-title mb-3">{title}</h3>
            </a>
          </Link>
        </div>
      </article>
    </>
  );
}
