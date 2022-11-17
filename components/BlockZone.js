import React from "react";
import dynamic from "next/dynamic";

const BlockZone = ({ sections, posts }) => {
  return (
    sections &&
    sections.map((section, index) => {
      const id = section.__component + index;
      switch (section.__component) {
        case "sections.banner":
          const BannerBlock = dynamic(() => import("@/components/Banner"));
          return <BannerBlock banner={section} key={id} />;
        case "sections.page-header":
          const PageHeaderBlock = dynamic(() =>
            import("@/components/PageHeader")
          );
          return <PageHeaderBlock title={section.Title} key={id} />;
        case "sections.contact":
          const Contact = dynamic(() => import("@/components/pages/Contact"));
          return <Contact section={section} key={id} />;
        case "sections.about":
          const About = dynamic(() => import("@/components/pages/About"));
          return <About section={section} key={id} />;
        case "sections.recent-posts":
          const RecentPosts = dynamic(() =>
            import("@/components/pages/RecentPosts")
          );
          return (
            <RecentPosts
              section={section}
              posts={posts}
              key={id}
            />
          );
        case "sections.detail":
          const Detail = dynamic(() => import("@/components/pages/Detail"));
          return <Detail section={section} key={id} />;
      }
    })
  );
};

export default BlockZone;
