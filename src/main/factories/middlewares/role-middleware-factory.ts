import { Middleware } from '@/presentation/protocols/middleware';
import { RoleMiddleware } from '@/presentation/middlewares/role-middleware';
import { makeIntegrationLoadAuthDetail } from '@/main/factories/usescase/auth/integration-load-auth-detail-factory';

export const makeRoleMiddleware = (role?: string): Middleware => {
    return new RoleMiddleware(makeIntegrationLoadAuthDetail(), role);
};
