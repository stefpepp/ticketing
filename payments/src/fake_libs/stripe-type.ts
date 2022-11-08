import { randomBytes } from 'crypto';

export enum CURRENCIES {
    USD = 'usd',
    EUR = 'eur',
    GBR = 'gbr',
    RSD = 'rsd'
}

export const token = 'tok_visa';

interface OptionsFields {
    api_version: string;
}

interface CreateChargeOptions {
    currency: CURRENCIES;
    amount: number;
    source: string
}

interface PaymentResult {
    id: string;
    status: string;
    errors: string[];
}

export class Stripe {
    readonly charges = {
        async create(chargeOptions: CreateChargeOptions): Promise<PaymentResult> {
            const { source } = chargeOptions;
            console.log('source:', source);
            //
            const newPaymentId = randomBytes(8).toString('hex');
            console.log('newpaymentid:', newPaymentId);
            if (source === 'tok_visa') {
                return {
                    id: newPaymentId,
                    status: 'OK',
                    errors: []
                }
            }
            throw new Error('Bad token');
        }
    }

    constructor(api_key: string, options: OptionsFields) {
    }
}

