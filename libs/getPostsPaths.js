import { getPosts } from "./getPosts"

export const getPostsPaths = async () => {
    const posts = await getPosts();

    return posts.map((post) => ({
        params: {
            slug: post.slug,
        }
    }));
}