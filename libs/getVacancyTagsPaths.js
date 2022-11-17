import { getVacancyTags } from "./getVacancyTags";

export const getVacancyTagsPaths = async () => {
  const tags = await getVacancyTags();

  if (tags) {
    return tags.map((tag) => ({
      params: {
        tagname: tag.slug,
      },
    }));
  }
  console.error("No tags returned");
  return [];
};