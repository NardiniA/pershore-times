import { sortByIssue } from "@/utils/sortByIssue";
import { formatPapers } from "@/utils/formatPapers";

export const getPapers = async () => {
  const res = await fetch(
    `${process.env.STRAPI_ADMIN_URL}/api/newspapers-${process.env.STRAPI_ADMIN_LOCALE}?populate=deep`
  );
  const papers = await res.json();

  if (papers?.data) {
    const news = papers?.data.map((paper) => {
      const { Issue, Date } = paper?.attributes;
      const file = paper?.attributes?.File?.data?.attributes;

      return {
        issue: Issue,
        date: Date,
        title: `Issue ${Issue} - ${formatPapers(Date)}`,
        file: file,
      };
    });

    return news.sort(sortByIssue);
  }
  return [];
};
