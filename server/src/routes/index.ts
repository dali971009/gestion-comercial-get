import express from "express";

import authRoutes from "./auth-routes";
import clientRoutes from "./client-routes";

const router = express.Router();

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoutes,
    },
    {
        path: '/clients',
        route: clientRoutes,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
