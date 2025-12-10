# Redis Cache Layer - Usage Guide

## 📦 Overview

The Redis cache layer has been implemented following SOLID principles and the existing project architecture patterns.

## 🏗️ Architecture

```
src/
├── data/protocols/cache/          # Cache interfaces (DIP)
│   ├── get-cache-repository.ts    # Get operations (ISP)
│   ├── set-cache-repository.ts    # Set operations (ISP)
│   └── delete-cache-repository.ts # Delete operations (ISP)
│
└── infra/db/redis/                # Redis implementation
    ├── helpers/
    │   └── redis-helper.ts        # Connection singleton
    ├── redis-cache-repository.ts  # Implementation
    └── redis-cache-repository.spec.ts # Tests
```

## 🚀 Getting Started

### 1. Start Redis Server

```bash
# Using Docker
docker run -d -p 6379:6379 redis:latest

# Or install locally
redis-server
```

### 2. Configure Environment

Update your `.env` file:

```bash
REDIS_URL=redis://localhost:6379
REDIS_TTL_DEFAULT=300
REDIS_ENABLED=true
```

### 3. Initialize Redis Connection

In your application startup (e.g., `src/main/server.ts`):

```typescript
import { RedisHelper } from '@/infra/db/redis/helpers/redis-helper';

// Connect to Redis on startup
await RedisHelper.connect();

// Disconnect on shutdown
process.on('SIGTERM', async () => {
    await RedisHelper.disconnect();
});
```

## 💡 Usage Examples

### Basic Cache Operations

```typescript
import { makeRedisCacheRepository } from '@/main/factories/infra/cache/redis-cache-repository-factory';

const cache = makeRedisCacheRepository();

// Set value with TTL (in seconds)
await cache.set('user:123', { name: 'John', age: 30 }, 300);

// Get value
const user = await cache.get('user:123');

// Check if exists
const exists = await cache.exists('user:123');

// Delete value
await cache.delete('user:123');
```

### Integration with Use Cases

Following the Dependency Inversion Principle, inject cache repositories into your use cases:

```typescript
import { GetCacheRepository } from '@/data/protocols/cache/get-cache-repository';
import { SetCacheRepository } from '@/data/protocols/cache/set-cache-repository';

export class DbLoadServicosWithCache implements LoadServicos {
    constructor(
        private readonly loadServicosRepository: LoadServicosRepository,
        private readonly getCacheRepository: GetCacheRepository,
        private readonly setCacheRepository: SetCacheRepository
    ) // ... other dependencies
    {}

    async load(params?: LoadServicosParams): Promise<Wrapper<ServicoModel[]>> {
        const cacheKey = `servicos:${JSON.stringify(params)}`;

        // Try cache first
        const cached = await this.getCacheRepository.get(cacheKey);
        if (cached) return cached;

        // Cache miss - fetch from DB
        const result = await this.loadServicosRepository.load(params);

        // Store in cache
        await this.setCacheRepository.set(cacheKey, result, 300);

        return result;
    }
}
```

### Factory Pattern

Create a factory for your cached use case:

```typescript
// src/main/factories/usescase/servico/db-load-servicos-with-cache-factory.ts
import { makeRedisCacheRepository } from '@/main/factories/infra/cache/redis-cache-repository-factory';
import { makeLoadServicosRepository } from '../db/load-servicos-repository-factory';

export const makeDbLoadServicosWithCache = (): LoadServicos => {
    const cache = makeRedisCacheRepository();
    const repository = makeLoadServicosRepository();

    return new DbLoadServicosWithCache(
        repository,
        cache, // GetCacheRepository
        cache // SetCacheRepository
        // ... other dependencies
    );
};
```

## 🎯 Best Practices

### 1. Cache Key Naming Convention

Use hierarchical keys with colons:

```typescript
// Good
`servicos:list:${filters}``user:${userId}:profile``billing:order:${orderId}`// Avoid
`servicos_list_${filters}``userProfile${userId}`;
```

### 2. TTL Strategy

-   **Short TTL (60-300s)**: Frequently changing data
-   **Medium TTL (300-3600s)**: Moderately stable data
-   **Long TTL (3600-86400s)**: Rarely changing data

```typescript
await cache.set('servicos:list', data, 300); // 5 minutes
await cache.set('user:profile', data, 3600); // 1 hour
await cache.set('config:settings', data, 86400); // 24 hours
```

### 3. Cache Invalidation

Invalidate cache when data changes:

```typescript
export class DbUpdateServico implements UpdateServico {
    constructor(
        private readonly updateRepository: UpdateServicoRepository,
        private readonly deleteCache: DeleteCacheRepository
    ) {}

    async update(params: UpdateServicoParams): Promise<ServicoModel> {
        const result = await this.updateRepository.update(params);

        // Invalidate related caches
        await this.deleteCache.delete(`servicos:${params.id}`);
        await this.deleteCache.delete('servicos:list');

        return result;
    }
}
```

### 4. Error Handling

Always handle cache failures gracefully:

```typescript
async load(params?: LoadServicosParams): Promise<Wrapper<ServicoModel[]>> {
    try {
        const cached = await this.getCacheRepository.get(cacheKey);
        if (cached) return cached;
    } catch (error) {
        console.error('Cache read error:', error);
        // Continue to database on cache failure
    }

    const result = await this.loadServicosRepository.load(params);

    try {
        await this.setCacheRepository.set(cacheKey, result, 300);
    } catch (error) {
        console.error('Cache write error:', error);
        // Don't fail the request if cache write fails
    }

    return result;
}
```

## 🧪 Testing

### Unit Tests

Mock the cache repositories in your tests:

```typescript
const makeGetCacheRepositoryStub = (): GetCacheRepository => {
    class GetCacheRepositoryStub implements GetCacheRepository {
        async get<T>(key: string): Promise<T | null> {
            return null; // Cache miss
        }
    }
    return new GetCacheRepositoryStub();
};
```

### Integration Tests

The Redis tests require a running Redis instance:

```bash
# Start Redis
docker run -d -p 6379:6379 redis:latest

# Run tests
npm test -- redis-cache-repository.spec.ts
```

## 🔧 Configuration

### Environment Variables

| Variable            | Default                  | Description                  |
| ------------------- | ------------------------ | ---------------------------- |
| `REDIS_URL`         | `redis://localhost:6379` | Redis connection URL         |
| `REDIS_TTL_DEFAULT` | `300`                    | Default TTL in seconds       |
| `REDIS_ENABLED`     | `true`                   | Enable/disable Redis caching |

### Disable Cache

To disable caching without code changes:

```bash
REDIS_ENABLED=false
```

## 📊 Monitoring

Check Redis connection status:

```typescript
import { RedisHelper } from '@/infra/db/redis/helpers/redis-helper';

if (RedisHelper.isClientConnected()) {
    console.log('Redis is connected');
}
```

## 🎓 SOLID Principles Applied

-   **SRP**: Each class has one responsibility
-   **OCP**: Extensible without modifying existing code
-   **LSP**: Implementations are substitutable
-   **ISP**: Segregated interfaces (Get, Set, Delete)
-   **DIP**: Depend on abstractions, not concretions

## 📚 References

-   [Redis Documentation](https://redis.io/docs/)
-   [node-redis Client](https://github.com/redis/node-redis)
-   [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
