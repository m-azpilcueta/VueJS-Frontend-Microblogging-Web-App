import TagList from "./TagList";
import TagPosts from "./TagPosts";

const routes = [
  {
    name: "TagList",
    path: "/tags",
    component: TagList,
    meta: { public: true },
  },
  {
    name: "TagPosts",
    path: "/tags/:id/posts",
    component: TagPosts,
    meta: { public: true },
  },
];

export default routes;
