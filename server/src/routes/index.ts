import express from "express";

import authRoutes from "./auth-routes";
import clientRoutes from "./client-routes";
import userRoutes from "./user-routes";
import serviceTypeRoutes from "./service-type-routes";

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
    {
        path: '/users',
        route: userRoutes,
    },
    {
        path: '/service-types',
        route: serviceTypeRoutes,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
