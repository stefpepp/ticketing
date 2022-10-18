import request from 'supertest';
import { app } from '../../app';

it('Expect cookie to be cleared on signout', async () => {
    global.signin();

    const response = await request(app)
        .post('/api/users/signout')
        .send({

        })
        .expect(200);
    expect(response.get('Set-Cookie')[0]).toBe("session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly");
});