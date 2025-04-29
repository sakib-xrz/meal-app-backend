import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { MemberRoutes } from '../modules/member/member.routes';
import { MealRoutes } from '../modules/meal/meal.routes';
import { BazarRoutes } from '../modules/bazar/bazar.routes';

const router = express.Router();

type Route = {
  path: string;
  route: express.Router;
};

const routes: Route[] = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/members',
    route: MemberRoutes,
  },
  {
    path: '/meals',
    route: MealRoutes,
  },
  {
    path: '/bazars',
    route: BazarRoutes,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
