import React from "react";
import dynamic from "next/dynamic";

const BlockZone = ({ sections, posts, authors }) => {
  return (
    sections &&
    sections.map((section, index) => {
      const id = section.template + index;
      switch (section.template) {
        case "banner":
          const BannerBlock = dynamic(() => import("@/components/Banner"));
          return <BannerBlock banner={{ frontMatter: section }} key={id} />;
        case "page-header":
          const PageHeaderBlock = dynamic(() =>
            import("@/components/PageHeader")
          );
          return <PageHeaderBlock title={section.title} key={id} />;
        case "contact":
          const Contact = dynamic(() => import("@/components/pages/Contact"));
          return <Contact section={section} key={id} />;
        case "about":
          const About = dynamic(() => import("@/components/pages/About"));
          return <About section={section} key={id} />;
        case "writers":
          const Writers = dynamic(() => import("@/components/pages/Writers"));
          return (
            <Writers
              section={section}
              posts={posts}
              authors={authors}
              key={id}
            />
          );
        case "recent-posts":
          const RecentPosts = dynamic(() =>
            import("@/components/pages/RecentPosts")
          );
          return (
            <RecentPosts
              section={section}
              posts={posts}
              authors={authors}
              key={id}
            />
          );
        case "detail":
          const Detail = dynamic(() => import("@/components/pages/Detail"));
          return <Detail section={section} key={id} />;
      }
    })
  );
};

export default BlockZone;
