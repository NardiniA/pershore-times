import Image from "next/image";
import Link from "next/link";

export default function Employer({
  employer: {
    employerSlug,
    employerFrontMatter: { name, logo },
  },
  jobCount,
}) {
  return (
    <>
      <Link href={`/employer/${employerSlug}`}>
        <a className="d-inline-block is-hoverable">
          <Image
            className="rounded"
            src={logo}
            alt={name}
            width={`150`}
            height={`150`}
            layout="fixed"
            placeholder="blur"
            blurDataURL={logo}
          />
          <h4 className="text-dark mt-4 mb-1">{name}</h4>
          <p className="mb-0">
            <span className="fw-bold text-black">
              {jobCount[name] < 9 ? `0${jobCount[name]}` : jobCount[name]}
            </span>{" "}
            Published jobs
          </p>
        </a>
      </Link>
    </>
  );
}
