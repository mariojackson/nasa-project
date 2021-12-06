import supertest from 'supertest';
import app from '../../app.js';

describe('Test GET /launches', () => {
  it('should respond with 200 success', async () => {
    const response = await request(app).get('/launches');
    expect(response.statusCode).toBe(200);
  });
});

describe('Test POST /launches', () => {
  const payload = {
    mission: 'USS Enterprise',
    rocket: 'NVV 1701',
    target: 'Kepler-16 f',
    launchDate: 'January 1, 2030',
  };

  const payloadWithoutDate = {
    mission: 'USS Enterprise',
    rocket: 'NVV 1701',
    target: 'Kepler-16 f',
  };

  const payloadWithInvalidDate = {
    mission: 'USS Enterprise',
    rocket: 'NVV 1701',
    target: 'Kepler-16 f',
    date: 'zoot',
  };

  it('should respond with 201 created', async () => {
    const response = await request(app)
      .post('/launches')
      .send(payload)
      .expect('Content-Type', /json/)
      .expect(response.statusCode)
      .toBe(201);

    const requestDate = new Date(payload.launchDate).valueOf();
    const responseDate = new Date(response.data.launchData).valueOf;
    expect(responseDate).toBe(requestDate);

    expect(response.body).toMatchObject(payloadWithoutDate);
  });

  it('should catch missing required properties', async () => {
    const response = await request(app)
      .send(payloadWithoutDate)
      .expect('Content-Type', /json/)
      .expect(response.statusCode)
      .toBe(400);

    expect(response.body).toStrictEqual({
      error: 'Missing required launch property',
    });
  });

  it('should catch invalid dates', async () => {
    const response = await request(app)
      .send(payloadWithInvalidDate)
      .expect('Content-Type', /json/)
      .expect(response.statusCode)
      .toBe(400);

    expect(response.body).toStrictEqual({
      error: 'Invalid launch date',
    });
  });
});
