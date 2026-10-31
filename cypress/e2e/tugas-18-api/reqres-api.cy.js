
import reqresAPI from '../../support/page/reqres-api';
import reqresData from '../../support/data/reqres-data';

describe('Hari 18 - Reqres API Automation', () => {

  // TC-API-001: Get List Users
  it('TC-API-001 - Get List Users', () => {
    reqresAPI.getUsers(2).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.page).to.eq(2);
      expect(response.body.data).to.be.an('array');
      expect(response.body.data.length).to.be.greaterThan(0);
    });
  });

  // TC-API-002: Get Single User
  it('TC-API-002 - Get Single User', () => {
    reqresAPI.getSingleUser(2).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.id).to.eq(2);
      expect(response.body.data.email).to.be.a('string');
      expect(response.body.data.first_name).to.not.be.empty;
    });
  });

  // TC-API-003: User Not Found
  it('TC-API-003 - Get User Not Found', () => {
    reqresAPI.getSingleUser(999).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  // TC-API-004: Get List Resources
  it('TC-API-004 - Get List Resources', () => {
    reqresAPI.getResources().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.be.an('array');
      expect(response.body.data.length).to.be.greaterThan(0);
    });
  });

  // TC-API-005: Get Single Resource
  it('TC-API-005 - Get Single Resource', () => {
    reqresAPI.getSingleResource(2).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.id).to.eq(2);
      expect(response.body.data.name).to.not.be.empty;
    });
  });

  // TC-API-006: Resource Not Found
  it('TC-API-006 - Get Resource Not Found', () => {
    reqresAPI.getSingleResource(999).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  // TC-API-007: Create User
  it('TC-API-007 - Create User', () => {
    reqresAPI.createUser(reqresData.createUser).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.name).to.eq(reqresData.createUser.name);
      expect(response.body.job).to.eq(reqresData.createUser.job);
      expect(response.body.id).to.exist;
      expect(response.body.createdAt).to.exist;
    });
  });

  // TC-API-008: Update User menggunakan PUT
  it('TC-API-008 - Update User dengan PUT', () => {
    reqresAPI.updateUser(2, reqresData.updateUser).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq(reqresData.updateUser.name);
      expect(response.body.job).to.eq(reqresData.updateUser.job);
      expect(response.body.updatedAt).to.exist;
    });
  });

  // TC-API-009: Update User menggunakan PATCH
  it('TC-API-009 - Update User dengan PATCH', () => {
    reqresAPI.patchUser(2, reqresData.patchUser).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.job).to.eq(reqresData.patchUser.job);
      expect(response.body.updatedAt).to.exist;
    });
  });

  // TC-API-010: Delete User
  it('TC-API-010 - Delete User', () => {
    reqresAPI.deleteUser(2).then((response) => {
      expect(response.status).to.eq(204);
    });
  });

  // TC-API-011: Login Berhasil
  it('TC-API-011 - Login Berhasil', () => {
    reqresAPI.login(reqresData.loginSuccess).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.token).to.be.a('string');
      expect(response.body.token).to.not.be.empty;
    });
  });

  // TC-API-012: Login Tanpa Password
  it('TC-API-012 - Login Tanpa Password', () => {
    reqresAPI.login(reqresData.loginFailed).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.be.a('string');
    });
  });

});
