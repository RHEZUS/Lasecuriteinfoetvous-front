import auth from "@/middleware/auth";
import guest from "@/middleware/guest";
import role from "@/middleware/role";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/auth/login/index.vue"),
  },
  {
    path: "/register",
    name: "reg",
    component: () => import("@/views/auth/register"),
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: () => import("@/views/auth/forgot-password.vue"),
  },
  {
    path: "/lock-screen",
    name: "lock-screen",
    component: () => import("@/views/auth/lock-screen.vue"),
  },
  {
    path: "/success-500",
    name: "success-500",
    component: () => import("@/views/auth/success.vue"),
  },
  {
    path: '/',
    name: 'Home-page',
    component: () => import("@/views/Homepage.vue"),
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import("@/views/blog/Blog.vue"),
  },
  {
    path: '/blog/search/:keyword',
    name: 'BlogSearch',
    component: () => import("@/views/blog/Search.vue"),
  },
  {
    path: '/blog/article/:slug',
    name: 'BlogDetails',
    component: () => import("@/views/blog/BlogDetails.vue"),
  },
  {
    path: '/blog/category/:slug',
    name: 'Blog Category',
    component: () => import("@/views/blog/Category.vue"),
  },
  {
    path: '/stories',
    name: 'STories',
    component: () => import("@/views/stories/Stories.vue"),
  },
  {
    path: '/stories/:slug',
    name: 'StoriesDetails',
    component: () => import("@/views/stories/StoryDetails.vue"),
  },
  {
    path: "/dashboard",
    name: "Layout",
    redirect: "/dashboard/home",
    component: () => import("@/Layout/index.vue"),
    meta: {
      middleware: [auth(['admin'])] // Add middleware to check if user is logged in and has the role of admin,
    },
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("@/views/dashboard/Home.vue"),
        meta: {
          hide: true,
        },
      },

      // Users
      {
        path: "users",
        name: "users",
        component: () => import("@/views/dashboard/users/Users.vue"),
        meta: {
          hide: true,
        },
      },

      // Stories
      {
        path: "story-categories",
        name: "story-categories",
        component: () => import("@/views/dashboard/stories/StoryCategories.vue"),
        meta: {
          groupParent: "stories",
          hide: true,
        },
      },
      {
        path: "all-stories",
        name: "all-stories",
        component: () => import("@/views/dashboard/stories/Stories.vue"),
        meta: {
          groupParent: "stories",
          hide: true,
        },
      },
      

      // Articles
      {
        path: "article-categories",
        name: "article-categories",
        component: () => import("@/views/dashboard/articles/ArticleCategories.vue"),
        meta: {
          groupParent: "articles",
          hide: true,
        },
      },
      {
        path: "all-articles",
        name: "all-articles",
        component: () => import("@/views/dashboard/articles/Articles.vue"),
        meta: {
          groupParent: "articles",
          hide: true,
        },
      },

      // Discussion Forum
      {
        path: "forum-categories",
        name: "forum-categories",
        component: () => import("@/views/dashboard/forum/categories.vue"),
        meta:{
          groupParent: "forum",
          hide: true,
        }
      },

      {
        path: "all-forums",
        name: "all-forums",
        component: () => import("@/views/dashboard/forum/threads.vue"),
        meta:{
          groupParent: "forum",
          hide: true,
        }
      },
      //{
      //  path: "forum-thread/:slug",
      //  name: "forum-thread",
      //  component: () => import("@/views/dashboard/forum/thread.vue"),
      //  meta:{
      //    groupParent: "forum",
      //    hide: true,
      //  }
      //},

      {
        path: "forum-tags",
        name: "forum-tags",
        component: () => import("@/views/dashboard/forum/tags.vue"),
        meta:{
          groupParent: "forum",
          hide: true,
        }
      },


      // Others
      {
        path: "blank-page",
        name: "blank-page",
        component: () => import("@/views/blank-page.vue"),
      },
      {
        path: "notifications",
        name: "notifications",
        component: () => import("@/views/notifications.vue"),
        meta: {
          hide: true,
        },
      },
      {
        path: "changelog",
        name: "changelog",
        component: () => import("@/views/changelog.vue"),
      },

      // components
      {
        path: "button",
        name: "button",
        component: () => import("@/views/components/button/index.vue"),
        meta: {
          groupParent: "components",
        },
      },
      {
        path: "alert",
        name: "alert",
        component: () => import("@/views/components/alert/index.vue"),
        meta: {
          groupParent: "components",
        },
      },
      {
        path: "card",
        name: "card",
        component: () => import("@/views/components/card/index.vue"),
        meta: {
          groupParent: "components",
        },
      },
      {
        path: "carousel",
        name: "carousel",
        component: () => import("@/views/components/carousel.vue"),
        meta: {
          groupParent: "components",
        },
      },
      {
        path: "dropdown",
        name: "dropdown",
        component: () => import("@/views/components/dropdown/index.vue"),
        meta: {
          groupParent: "components",
        },
      },
      {
        path: "modal",
        name: "dodal",
        component: () => import("@/views/components/modal/index.vue"),
        meta: {
          groupParent: "components",
        },
      },
      {
        path: "tab-accordion",
        name: "tab-accordion",
        component: () => import("@/views/components/tab-accordion/index.vue"),
        meta: {
          groupParent: "components",
        },
      },
      {
        path: "badges",
        name: "badges",
        component: () => import("@/views/components/badges.vue"),
        meta: {
          groupParent: "components",
        },
      },
      {
        path: "tooltip-popover",
        name: "tooltip-popover",
        component: () => import("@/views/components/tooltip-popover.vue"),
        meta: {
          groupParent: "components",
        },
      },
      {
        path: "typography",
        name: "typography",
        component: () => import("@/views/components/typography.vue"),
        meta: {
          groupParent: "components",
        },
      },
      {
        path: "colors",
        name: "colors",
        component: () => import("@/views/components/colors.vue"),
        meta: {
          groupParent: "components",
        },
      },
      {
        path: "image",
        name: "image",
        component: () => import("@/views/components/image/index.vue"),
        meta: {
          groupParent: "components",
        },
      },
      {
        path: "video",
        name: "video",
        component: () => import("@/views/components/video.vue"),
        meta: {
          groupParent: "components",
        },
      },
      {
        path: "pagination",
        name: "pagination",
        component: () => import("@/views/components/pagination"),
        meta: {
          groupParent: "components",
        },
      },
      {
        path: "progress-bar",
        name: "progress-bar",
        component: () => import("@/views/components/progress-bar/index.vue"),
        meta: {
          groupParent: "components",
        },
      },
      {
        path: "placeholder",
        name: "placeholder",
        component: () => import("@/views/components/placeholder.vue"),
        meta: {
          groupParent: "placeholder",
        },
      },
      // widgets
      {
        path: "basic",
        name: "basic",
        component: () => import("@/views/widgets/basic.vue"),
        meta: {
          groupParent: "widgets",
        },
      },
      {
        path: "statistic",
        name: "statistic",
        component: () => import("@/views/widgets/statistic.vue"),
        meta: {
          groupParent: "widgets",
        },
      },

      // forms
      {
        path: "input",
        name: "input",
        component: () => import("@/views/forms/input"),
        meta: {
          groupParent: "forms",
        },
      },
      {
        path: "input-group",
        name: "input-group",
        component: () => import("@/views/forms/input-group"),
        meta: {
          groupParent: "forms",
        },
      },
      {
        path: "input-layout",
        name: "input-layout",
        component: () => import("@/views/forms/input-layout"),
        meta: {
          groupParent: "forms",
        },
      },
      {
        path: "form-validation",
        name: "form-validation",
        component: () => import("@/views/forms/form-validation"),
        meta: {
          groupParent: "forms",
        },
      },
      {
        path: "form-wizard",
        name: "form-wizard",
        component: () => import("@/views/forms/form-wizard"),
        meta: {
          groupParent: "forms",
        },
      },
      {
        path: "form-repeater",
        name: "form-repeater",
        component: () => import("@/views/forms/form-repeater"),
        meta: {
          groupParent: "forms",
        },
      },
      {
        path: "input-mask",
        name: "input-mask",
        component: () => import("@/views/forms/input-mask"),
        meta: {
          groupParent: "forms",
        },
      },
      {
        path: "file-input",
        name: "file-input",
        component: () => import("@/views/forms/file-input"),
        meta: {
          groupParent: "forms",
        },
      },
      {
        path: "checkbox",
        name: "checkbox",
        component: () => import("@/views/forms/checkbox.vue"),
        meta: {
          groupParent: "forms",
        },
      },
      {
        path: "radio-button",
        name: "radio-button",
        component: () => import("@/views/forms/radio-button.vue"),
        meta: {
          groupParent: "forms",
        },
      },
      {
        path: "textarea",
        name: "textarea",
        component: () => import("@/views/forms/textarea"),
        meta: {
          groupParent: "forms",
        },
      },
      {
        path: "switch",
        name: "switch",
        component: () => import("@/views/forms/switch"),
        meta: {
          groupParent: "forms",
        },
      },
      {
        path: "select",
        name: "select",
        component: () => import("@/views/forms/select"),
        meta: {
          groupParent: "forms",
        },
      },
      {
        path: "date-time-picker",
        name: "date-time-picker",
        component: () => import("@/views/forms/date-time-picker"),
        meta: {
          groupParent: "forms",
        },
      },
      // table view
      {
        path: "table-basic",
        name: "table-basic",
        component: () => import("@/views/table/basic"),
        meta: {
          groupParent: "Table",
        },
      },
      {
        path: "table-advanced",
        name: "table-advanced",
        component: () => import("@/views/table/advanced"),
        meta: {
          groupParent: "Table",
        },
      },
      // chart
      {
        path: "appex-chart",
        name: "appex-chart",
        component: () => import("@/views/chart/appex-chart"),
        meta: {
          groupParent: "charts",
        },
      },
      {
        path: "chartjs",
        name: "chartjs",
        component: () => import("@/views/chart/chartjs"),
        meta: {
          groupParent: "charts",
        },
      },
      // app
      {
        path: "calender",
        name: "calender",
        component: () => import("@/views/app/calendar"),
      },
      {
        path: "todo",
        name: "todo",
        component: () => import("@/views/app/todo"),
        meta: {
          hide: true,
          appheight: true,
        },
      },
      {
        path: "kanban",
        name: "kanban",
        component: () => import("@/views/app/kanban"),
        meta: {
          hide: true,
        },
      },
      {
        path: "email",
        name: "email",
        component: () => import("@/views/app/email"),
        meta: {
          groupParent: "Project",
          hide: true,
          appheight: true,
        },
      },
      {
        path: "projects",
        name: "projects",
        component: () => import("@/views/app/projects"),
        meta: {
          hide: true,
        },
      },
      {
        path: "project-details",
        name: "project-details",
        component: () => import("@/views/app/projects/project-details.vue"),
        meta: {
          hide: true,
        },
      },
      {
        path: "products",
        name: "products",
        component: () => import("@/views/app/ecommerce/index.vue"),
        meta: {
          hide: true,
        },
      },
      {
        path: "products/:id",
        name: "product-details",
        component: () => import("@/views/app/ecommerce/product-details.vue"),
        meta: {
          hide: true,
        },
      },
      {
        path: "cart",
        name: "cart",
        component: () => import("@/views/app/ecommerce/cart.vue"),
        meta: {
          hide: true,
        },
      },
      {
        path: "wishlist",
        name: "wishlist",
        component: () => import("@/views/app/ecommerce/wishlist.vue"),
        meta: {
          hide: true,
        },
      },

      {
        path: "add-product",
        name: "add-product",
        component: () => import("@/views/app/ecommerce/add-product.vue"),
        meta: {
          hide: true,
        },
      },
      {
        path: "edit-product",
        name: "edit-product",
        component: () => import("@/views/app/ecommerce/edit-product.vue"),
        meta: {
          hide: true,
        },
      },

      {
        path: "chat",
        name: "chat",
        component: () => import("@/views/app/chat"),
        meta: {
          hide: true,
          appheight: true,
        },
      },
      // normal pages
      {
        path: "invoice",
        name: "invoice",
        component: () => import("@/views/utility/invoice"),
        meta: {
          groupParent: "Utility",
        },
      },
      {
        path: "invoice-preview",
        name: "invoice-preview",
        component: () => import("@/views/utility/invoice/invoice-preview"),
        meta: {
          hide: true,
        },
      },
      {
        path: "invoice-edit",
        name: "invoice-edit",
        component: () => import("@/views/utility/invoice/invoice-edit"),
        meta: {
          groupParent: "Utility",
        },
      },
      {
        path: "invoice-add",
        name: "invoice-add",
        component: () => import("@/views/utility/invoice/invoice-add"),
        meta: {
          groupParent: "Utility",
        },
      },
      {
        path: "Pricing",
        name: "pricing",
        component: () => import("@/views/utility/pricing"),
        meta: {
          groupParent: "Utility",
        },
      },
      {
        path: "faq",
        name: "faq",
        component: () => import("@/views/utility/faq"),
        meta: {
          groupParent: "Utility",
        },
      },
      {
        path: "blog",
        name: "blog",
        component: () => import("@/views/utility/blog"),
        meta: {
          groupParent: "Utility",
        },
      },
      {
        path: "blog-details",
        name: "blog-details",
        component: () => import("@/views/utility/blog/blog-details"),
        meta: {
          groupParent: "Utility",
        },
      },
      {
        path: "testimonial",
        name: "testimonial",
        component: () => import("@/views/utility/testimonial"),
        meta: {
          groupParent: "Utility",
        },
      },
      {
        path: "map",
        name: "map",
        component: () => import("@/views/map"),
      },
      {
        path: "profile",
        name: "profile",
        component: () => import("@/views/profile.vue"),
      },
      {
        path: "profile-setting",
        name: "profile-setting",
        component: () => import("@/views/profile.vue"),
      },
      {
        path: "settings",
        name: "settings",
        component: () => import("@/views/settings.vue"),
      },
      {
        path: "icons",
        name: "icons",
        component: () => import("@/views/icons.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    name: "404",
    component: () => import("@/views/404.vue"),
  },
  {
    path: "/coming-soon",
    name: "coming-soon",
    component: () => import("@/views/utility/comming-soon"),
  },
  {
    path: "/under-construction",
    name: "under-construction",
    component: () => import("@/views/utility/under-construction"),
  },
  {
    path: "/error",
    name: "error",
    component: () => import("@/views/error.vue"),
  },
];

export default routes;
