import { Post } from "../types/post";

const posts: Record<string,Post> = {
    //slug: file            (the .default is to access the export default)
    post1: require('./post1').default,
    post2: require('./post2').default,
    post3: require('./post3').default,
}

export default posts;