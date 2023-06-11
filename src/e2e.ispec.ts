import request from 'supertest';
import app from './app';
import { config } from './config';
import { TestHarness } from './testHarness';
import { MongoDB } from './mongoDB';

describe('e2e', () => {
  let testHarness: TestHarness;

  beforeAll(async () => {
    const mongo = new MongoDB(config);

    testHarness = new TestHarness(app, mongo, config);

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
});
