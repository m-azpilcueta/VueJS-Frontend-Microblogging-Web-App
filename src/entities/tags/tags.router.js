import TagList from "./TagList";
import TagPosts from "./TagPosts";
import ManageTags from "./ManageTags";

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
  {
    name: "ManageTags",
    path: "/tags/manage",
    component: ManageTags,
  },
];

export default routes;
