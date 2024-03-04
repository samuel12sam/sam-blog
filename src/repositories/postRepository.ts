// to help fetch the posts

// posts is the object containing every post object
import posts from "../content";


export const getAllPosts = () => {
    return Object.values(posts);
}


export const getPost = (slug: string) => {
    return posts[slug]
}