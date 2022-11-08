import { randomBytes } from 'crypto';

export const fakeStripe = {
    charges: {
        create: jest.fn().mockResolvedValue({ id: randomBytes(8).toString('hex') })
    }
}