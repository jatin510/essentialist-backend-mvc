import request from 'supertest';
import app from './app';
import { config } from './config';
import { TestHarness } from './testHarness';
import { MongoDB } from './mongoDB';

describe('e2e', () => {
  const mongo = new MongoDB(config);
  const testHarness: TestHarness = new TestHarness(app, mongo, config);

  beforeAll(async () => {
    await testHarness.start();
  });

  afterAll(async () => {
    await testHarness.stop();
  });

  describe('health check', () => {
    it('can check the health of the server', async () => {
      const response = await request(testHarness.getHttp())
        .get('/health')
        .set('Accept', 'application/json');

      expect(response.status).toEqual(200);
      expect(response.body.ok).toEqual(true);
    });
  });

  describe('api /user', function () {
    it('create user post api', async function () {
      const user = {
        username: 'john',
        password: 'password',
        age: '24',
      };

      const response = await request(testHarness.getHttp())
        .post('/user')
        .send(user)
        .set('Accept', 'application/json');

      expect(response.status).toBe(201);
      expect(response.body.ok).toBeTruthy();
      expect(response.body.data.username).toEqual(user.username);
      expect(response.body.data.password).toEqual(user.password);
      expect(response.body.data.age).toEqual(user.age);
    });
  });
});
