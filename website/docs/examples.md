---
sidebar_position: 2
---

# Examples

The other pages show individual features in isolation. These are two complete test suites,
written the way you'd actually use ts-mockito in a real test file - both are runnable as-is with
`describe`/`it` (whether from `node:test`, Jest, or Mocha).

## Mocking a dependency

`UserService` depends on a `UserRepository`. Rather than standing up a real repository, the
repository is mocked so the test can control exactly what it returns and verify how it was used.

```typescript
import {anyNumber, anything, instance, mock, verify, when} from '@typestrong/ts-mockito';

class User {
    constructor(public id: number, public name: string) {
    }
}

class UserRepository {
    public findById(id: number): Promise<User | null> {
        throw new Error('not implemented');
    }

    public save(user: User): Promise<void> {
        throw new Error('not implemented');
    }
}

class UserService {
    constructor(private repository: UserRepository) {
    }

    public async rename(id: number, newName: string): Promise<User> {
        const user = await this.repository.findById(id);
        if (!user) {
            throw new Error(`User ${id} not found`);
        }
        const renamed = new User(user.id, newName);
        await this.repository.save(renamed);
        return renamed;
    }
}

describe('UserService', () => {
    let mockedRepository: UserRepository;
    let userService: UserService;

    beforeEach(() => {
        mockedRepository = mock(UserRepository);
        userService = new UserService(instance(mockedRepository));
    });

    describe('rename', () => {
        it('loads the user, saves it under the new name, and returns it', async () => {
            // given
            const existingUser = new User(1, 'Alice');
            when(mockedRepository.findById(1)).thenResolve(existingUser);
            when(mockedRepository.save(anything())).thenResolve();

            // when
            const result = await userService.rename(1, 'Alicia');

            // then
            expect(result.name).toEqual('Alicia');
            verify(mockedRepository.save(anything())).once();
        });

        it('throws when the user does not exist, and never saves', async () => {
            // given
            when(mockedRepository.findById(anyNumber())).thenResolve(null);

            // when
            let error: Error | undefined;
            try {
                await userService.rename(999, 'Ghost');
            } catch (e) {
                error = e as Error;
            }

            // then
            expect(error?.message).toEqual('User 999 not found');
            verify(mockedRepository.save(anything())).never();
        });
    });
});
```

## Spying on a real collaborator

`PaymentProcessor` depends on a `Logger`. Rather than mocking it away entirely, `spy` wraps the
*real* logger so its actual behavior still runs - the test just observes and asserts on it.

```typescript
import {instance, spy, verify} from '@typestrong/ts-mockito';

class Logger {
    private lines: string[] = [];

    public log(message: string): void {
        this.lines.push(message);
    }

    public history(): string[] {
        return this.lines;
    }
}

class PaymentProcessor {
    constructor(private logger: Logger) {
    }

    public charge(amount: number): string {
        if (amount <= 0) {
            this.logger.log(`Rejected invalid charge: ${amount}`);
            throw new Error('Amount must be positive');
        }
        this.logger.log(`Charged ${amount}`);
        return `charge-${amount}`;
    }
}

describe('PaymentProcessor', () => {
    let logger: Logger;
    let spiedLogger: Logger;
    let processor: PaymentProcessor;

    beforeEach(() => {
        logger = new Logger();
        spiedLogger = spy(logger);
        processor = new PaymentProcessor(instance(spiedLogger));
    });

    describe('charge', () => {
        it('logs and returns a charge id for a valid amount', () => {
            // when
            const chargeId = processor.charge(50);

            // then
            expect(chargeId).toEqual('charge-50');
            expect(logger.history()).toEqual(['Charged 50']); // the real logger really ran
            verify(spiedLogger.log('Charged 50')).once();
        });

        it('logs the rejection and throws for a non-positive amount', () => {
            // when
            let error: Error | undefined;
            try {
                processor.charge(-5);
            } catch (e) {
                error = e as Error;
            }

            // then
            expect(error?.message).toEqual('Amount must be positive');
            verify(spiedLogger.log('Rejected invalid charge: -5')).once();
        });
    });
});
```
