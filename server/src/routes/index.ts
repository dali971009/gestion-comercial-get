import express from 'express';

import authRoutes from './auth-routes';
import clientRoutes from './client-routes';
import userRoutes from './user-routes';
import serviceRequestRoutes from './service-request-routes';
import serviceTypeRoutes from './service-type-routes';
import serviceRoutes from './service-routes';
import commercialOfferRoutes from './commercial-offer-routes';
import contractRoutes from './contract-routes';

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
  {
    path: '/services',
    route: serviceRoutes,
  },
  {
    path: '/service-requests',
    route: serviceRequestRoutes,
  },
  {
    path: '/commercial-offers',
    route: commercialOfferRoutes,
  },
  {
    path: '/contracts',
    route: contractRoutes,
  },
];

defaultRoutes.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
