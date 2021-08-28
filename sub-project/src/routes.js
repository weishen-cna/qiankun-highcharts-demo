export default [
    {
        path: "/",
        name: "Home",
        component: () => import("./components/HelloWorld.vue")
    },
    {
        path: "/MarketPlaceDashboard",
        name: "MarketPlaceDashboard",
        component: () => import("./components/HelloWorld.vue")
    }
]