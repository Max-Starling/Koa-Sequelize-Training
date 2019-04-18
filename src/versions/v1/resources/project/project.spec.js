const chai = require('chai');
const expect = require('chai').expect;
const axios = require('axios');

const validate = require('./validators/add.validator');
const validateProject = require('./project.schema');
const sequelizeService = require('../../../../services/sequelize.service');
const config = require('../../../../config');

chai.should();

describe('test project validator', () => {
  it('should say that name is required', async () => {
    const result = await validate({});
    if (result) {
      result.message.should.equal('"name" is required');
    }
  });

  it('should say that name cannot be empty', async () => {
    const result = await validate({ name: "" });
    if (result) {
      result.message.should.equal('"name" is not allowed to be empty');
    }
  });

  it('should say that name is too short', async () => {
    const result = await validate({ name: "hi" });
    if (result) {
      result.message.should.equal('"name" length must be at least 3 characters long');
    }
  });

  it('should say that name is too long', async () => {
    const result = await validate({ name: "qweqweqweqweqweqweqweqweqweqweqweqweqwe" });
    if (result) {
      result.message.should.equal('"name" length must be less than or equal to 30 characters long');
    }
  });
});

describe('test project API', () => {
  describe('sequelize', () => {
    it('sequelize should be connected', async () => {
      const isConnected = await sequelizeService.check();
      isConnected.should.equal(true);
    });
  });

  describe('get projects', () => {
    it('get projects should return status 200', async () => {
      const { status } = await axios.get(`${config.apiUrl}/v1/project`);
      status.should.equal(200);
    });

    it('get projects should return array', async () => {
      const { data } = await axios.get(`${config.apiUrl}/v1/project`);
      expect(data).to.be.an('array');
    });

    it('get projects should return array of valid projects', async () => {
      const { data } = await axios.get(`${config.apiUrl}/v1/project`);
      expect(validateProject(data[0])).to.be.a('null');
    });
  });

  describe('add & get, delete & get project', () => {
    let projectId = null;

    it('add invalid project should return status 404', async () => {
      const projectData = { name: 'invalid naaaaaaaaaaaaaaaaaaaaaaaaaaaaaame' };

      try {
        await axios.post(`${config.apiUrl}/v1/project`, projectData);
      } catch (e) {
        if (e.response) {
          e.response.status.should.equal(404);
        } else {
          e.status.should.equal(404);
        }
      }
    });

    it('add project should return status 201', async () => {
      const projectData = { name: 'valid test name' };
  
      const { data, status } = await axios.post(`${config.apiUrl}/v1/project`, projectData);
      projectId = data.id;
      status.should.equal(201);
    });

    it('get project should return valid project', async () => {
      const { data } = await axios.get(`${config.apiUrl}/v1/project/${projectId}`);
      expect(validateProject(data)).to.be.a('null');
    });
  
    it('delete project should return status 200', async () => {  
      const { status } = await axios.delete(`${config.apiUrl}/v1/project/${projectId}`);
      status.should.equal(200);
    });

    it('get project should return status 404', async () => {
      try {
        await await axios.get(`${config.apiUrl}/v1/project/${projectId}`);
      } catch (e) {
        if (e.response) {
          e.response.status.should.equal(404);
        } else {
          e.status.should.equal(404);
        }
      }
    });
  });
});