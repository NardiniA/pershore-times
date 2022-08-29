import React from "react";
import Post from "@/components/Post";
import Link from "next/link";
import { IconNewSection } from "@tabler/icons";

const RecentPosts = ({ section, posts, authors }) => {
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
        {posts && posts.slice(0, 6).map((post, i) => (
          <div key={i} className="col-lg-6">
            <Post post={post} authors={authors} />
          </div>
        ))}

        <div className="col-12 text-center">
          <Link href={`/blog`}>
            <a className="btn btn-primary mt-5" aria-label="View All Posts">
              <i className="me-2">
                <IconNewSection size={16} />
              </i>
              View All Posts
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default RecentPosts;
