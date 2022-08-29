import React from "react";
import Paper from "@/components/Paper";
import Link from "next/link";
import { IconNewSection } from "@tabler/icons";

const RecentPapers = ({ section, papers }) => {
  return (
    <>
      <div className="row">
        <div className="col-12 text-center">
          <h2 className="section-title">
            <span>{section.title}</span>
          </h2>
        </div>
      </div>
      <div className="row gy-5 gx-4 g-xl-5 mb-5">
        {papers && papers.slice(0, 6).map((paper, i) => (
          <div key={i} className="col-lg-6">
            <Paper paper={paper} />
          </div>
        ))}

        <div className="col-12 text-center">
          <Link href={`/newspapers`}>
            <a className="btn btn-primary mt-5" aria-label="View All Papers">
              <i className="me-2">
                <IconNewSection size={16} />
              </i>
              View All Papers
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default RecentPapers;
