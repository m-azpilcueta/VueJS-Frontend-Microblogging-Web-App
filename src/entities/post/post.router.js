import PostList from "./PostList";
import PostForm from "./PostForm";
import PostDetail from "./PostDetail";
import PostListPreloading from "./PostListPreloading";
import PostListSinVuetify from "./PostListSinVuetify";
import UserDetail from "../user/UserDetail";

const routes = [
  {
    name: "PostList",
    path: "/posts",
    component: PostList,
    meta: { public: true },
  },
  {
    name: "PostListPreloading",
    path: "/posts_preloading",
    component: PostListPreloading,
    meta: { public: true },
  },
  {
    name: "PostListSinVuetify",
    path: "/posts_sin_vuetify",
    component: PostListSinVuetify,
    meta: { public: true },
  },
  // /posts/new debe colocarse antes de /posts/:id porque si no vue-router
  // interpreta "new" como si fuera el id.
  //
  // Una forma de evitar este problema es usar una expresión regular para
  // limitar los valores que son interpretados. Por ejemplo, usando el path
  // /posts/:id(\\d+), vue-router espera que :id sea numérico.
  {
    name: "PostCreate",
    path: "/posts/new",
    component: PostForm,
  },
  {
    name: "PostDetail",
    path: "/posts/:id",
    component: PostDetail,
    meta: { public: true },
  },
  {
    name: "UserDetail",
    path: "/user/:id",
    component: UserDetail,
    meta: { public: true },
  },
];

export default routes;
