import request from 'supertest';
import app from './index.js'; 

describe('Event API Tests', () => {
    it('should register a new user', async () => {
        const res = await request(app).post('/api/register').send({
            username: "testuser",
            email: "testuser@example.com",
            password: "password123"
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("User registered successfully");
    });
});
