
class ReqresAPI {
  baseUrl = 'https://reqres.in/api';

  headers() {
    return cy.env(['REQRES_API_KEY']).then((env) => ({
      'x-api-key': env.REQRES_API_KEY,
      'X-Reqres-Env': 'prod'
    }));
  }

  getUsers(page) {
    return this.headers().then((headers) =>
      cy.request({
        method: 'GET',
        url: `${this.baseUrl}/users?page=${page}`,
        headers
      })
    );
  }

  getSingleUser(id) {
    return this.headers().then((headers) =>
      cy.request({
        method: 'GET',
        url: `${this.baseUrl}/users/${id}`,
        headers,
        failOnStatusCode: false
      })
    );
  }

  getResources() {
    return this.headers().then((headers) =>
      cy.request({
        method: 'GET',
        url: `${this.baseUrl}/unknown`,
        headers
      })
    );
  }

  getSingleResource(id) {
    return this.headers().then((headers) =>
      cy.request({
        method: 'GET',
        url: `${this.baseUrl}/unknown/${id}`,
        headers,
        failOnStatusCode: false
      })
    );
  }

  createUser(data) {
    return this.headers().then((headers) =>
      cy.request({
        method: 'POST',
        url: `${this.baseUrl}/users`,
        headers,
        body: data
      })
    );
  }

  updateUser(id, data) {
    return this.headers().then((headers) =>
      cy.request({
        method: 'PUT',
        url: `${this.baseUrl}/users/${id}`,
        headers,
        body: data
      })
    );
  }

  patchUser(id, data) {
    return this.headers().then((headers) =>
      cy.request({
        method: 'PATCH',
        url: `${this.baseUrl}/users/${id}`,
        headers,
        body: data
      })
    );
  }

  deleteUser(id) {
    return this.headers().then((headers) =>
      cy.request({
        method: 'DELETE',
        url: `${this.baseUrl}/users/${id}`,
        headers
      })
    );
  }

  login(data) {
    return this.headers().then((headers) =>
      cy.request({
        method: 'POST',
        url: `${this.baseUrl}/login`,
        headers,
        body: data,
        failOnStatusCode: false
      })
    );
  }
}

export default new ReqresAPI();
