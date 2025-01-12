import { expressMiddlewareAdapter } from '@/main/adapters/express-middleware-adapter';
import { makeRoleMiddleware } from '@/main/factories/middlewares/role-middleware-factory';
import { Role } from '@/main/config/role';

export const adminRole = expressMiddlewareAdapter(makeRoleMiddleware(Role.ADMIN));
