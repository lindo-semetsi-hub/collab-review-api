import request from 'supertest';
import app from './server'; //export

(async () => {

  // regsiter test
  const registerRes = await request(app)
    .post('/api/auth/register')
    .send({ name: 'Lindo', email: 'lindo@test.com', password: '586211' });
  console.log('Register response:', registerRes.body);


  //login test
  const loginRes = await request(app)
    .post('/api/auth/login')
    .send({ email: 'Lindo@test.com', password: '586211' });
  console.log('Login response:', loginRes.body);
})();