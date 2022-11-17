import { getTags } from "./getTags"

export const getTagsPaths = async () => {
    const tags = await getTags();

    if (tags) {
        return tags.map((tag) => ({
            params: {
                tagname: tag.slug,
            },
        }));
    }
    console.error("No tags returned");
    return [];
}