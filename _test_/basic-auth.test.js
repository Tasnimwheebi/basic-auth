'use strict';
const supergoose = require('@code-fellows/supergoose');
const server = require('../src/server.js');
const basic = require('../src/auth/middleware/basic.js');

const Users = require('../src/auth/models/users-model.js');
const mongoose = require('mongoose');
const mockRequest = supergoose(server);
const object= {
  username:'tasnim',
  password:'1234',
};

describe('basic auth',() => {
  it('should create a new one', async() => {
    const res = await mockRequest.post('/signup').send({username:'tasnim',password:'1234'});
    const resObj = res.body;
    console.log(res.body);
    expect(res.status).toBe(201);
    expect(resObj.username).toEqual(object.username);
    expect(resObj.password.length).toBeGreaterThan(0);
  });

  
  it('should login with post method', async() => {
    const res = await mockRequest.post('/signin').auth(object.username,object.password);
    const resObj = res.body;
    expect(res.status).toBe(200);
    expect(resObj.username).toEqual(object.username);
  });
});



describe('bad logins', () => {
 
  it('basic fails with known user and wrong password ', async () => {


    const response = await mockRequest.post('/signin')
      .auth('tasnim', 'xyz');
    const userObject = response.body;

    expect(response.status).toBe(401);
    expect(userObject.user).not.toBeDefined();
    expect(userObject.token).not.toBeDefined();

  });

  it('basic fails with unknown user', async () => {

    const response = await mockRequest.post('/signin')
      .auth('nobody', 'xyz');
    const userObject = response.body;

    expect(response.status).toBe(401);
    expect(userObject.user).not.toBeDefined();
    expect(userObject.token).not.toBeDefined();

  });


 
});






