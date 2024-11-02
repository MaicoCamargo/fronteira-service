import { Controller } from '@/presentation/protocols';
import { HealthCheckController } from '@/presentation/controllers/health-check-controller';

export const makeHealthCheckController = (): Controller => {
    return new HealthCheckController();
};
