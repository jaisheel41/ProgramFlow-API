import request from 'supertest';
import app from '../src/app';

describe('Program API', () => {
  const testProgram = {
    id: 101,
    title: 'Leadership Mastery',
    topic: 'personal-leadership-and-team-development',
    learningFormats: ['virtual', 'residential'],
    bestseller: false,
    startDate: '2025-06-01T00:00:00+0000'
  };

  it('should return an array (possibly empty)', async () => {
    const res = await request(app).get('/api/programs');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should add a new program', async () => {
    const res = await request(app)
      .post('/api/programs')
      .send(testProgram)
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Program added successfully');
  });

  it('should return the added program in the list', async () => {
    const res = await request(app).get('/api/programs');
    const match = res.body.find((p: any) => p.id === testProgram.id);
    expect(match).toBeDefined();
    expect(match.title).toBe(testProgram.title);
  });

  it('should delete the program by ID', async () => {
    const res = await request(app).delete(`/api/programs/${testProgram.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain('deleted');
  });

  it('should confirm the program is gone', async () => {
    const res = await request(app).get('/api/programs');
    const match = res.body.find((p: any) => p.id === testProgram.id);
    expect(match).toBeUndefined();
  });
});

it('should update a program', async () => {
  const create = await request(app)
    .post('/api/programs')
    .send({
      id: 202,
      title: 'Test Update',
      topic: 'change-and-culture',
      learningFormats: ['virtual'],
      bestseller: false,
      startDate: '2024-08-01T00:00:00+0000'
    });

  expect(create.statusCode).toBe(201);

  const update = await request(app)
    .put('/api/programs/202')
    .send({ title: 'Updated Title', bestseller: true });

  expect(update.statusCode).toBe(200);
  expect(update.body.message).toContain('updated');

  const verify = await request(app).get('/api/programs');
  const updated = verify.body.find((p: any) => p.id === 202);
  expect(updated.title).toBe('Updated Title');
  expect(updated.bestseller).toBe(true);
});
