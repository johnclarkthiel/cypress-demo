describe("API CRUD Tests on Pet Store API", () => {
    let createdPetId;

    before(() => {
        const id = Date.now();
        const postBody = `{
            "id": ${id},
            "category": {
              "id": 0,
              "name": "string"
            },
            "name": "doggie",
            "photoUrls": [
              "string"
            ],
            "tags": [
              {
                "id": 0,
                "name": "string"
              }
            ],
            "status": "available"
          }`;
          cy.request({
              'method': 'POST', 
              'url': 'https://petstore.swagger.io/v2/pet/', 
              'headers': {
                  'content-type': 'application/json',
                  'accept': 'application/json'
              },
              'body': postBody
            }).then(
            (response) => {
              expect(response.isOkStatusCode);
              expect(response.body).to.have.property('id');
              expect(response.body).to.have.property('name', 'doggie')
              createdPetId = response.body['id'];
            }
          )
    })

    it('verifies a pet can be retrieved by id via find by pet id endpoint', () => {
        cy.request({
            'method': 'GET', 
            'url': `https://petstore.swagger.io/v2/pet/${createdPetId}`, 
            'headers': {
                'content-type': 'application/json',
                'accept': 'application/json'
            }
          }).then(
          (response) => {
            expect(response.isOkStatusCode);
            expect(response.body).to.have.property('id', createdPetId);
            expect(response.body).to.have.property('name', 'doggie')
          }
        )
    })

    it('verifies a pet can be updated via post by pet id endpoint', () => {
        cy.request({
            'method': 'POST', 
            'url': `https://petstore.swagger.io/v2/pet/${createdPetId}`, 
            'headers': {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            form: true, 
            body: {
              name: 'bob',
              status: 'inactive',
            },
          }).then(
          (response) => {
            expect(response.isOkStatusCode);
            cy.request({
                'method': 'GET', 
                'url': `https://petstore.swagger.io/v2/pet/${createdPetId}`, 
                'headers': {
                    'content-type': 'application/json',
                    'accept': 'application/json'
                }
              }).then(
              (response) => {
                expect(response.isOkStatusCode);
                expect(response.body).to.have.property('id', createdPetId);
                expect(response.body).to.have.property('name', 'bob')
                expect(response.body).to.have.property('status', 'inactive')
              }
            )
          }
        )
    })

    it('verifies a pet can be deleted by delete by id endpoint', () => {
        cy.request({
            'method': 'DELETE', 
            'url': `https://petstore.swagger.io/v2/pet/${createdPetId}`, 
            'headers': {
                'content-type': 'application/json',
                'accept': 'application/json'
            }
          }).then(
          (response) => {
            expect(response.isOkStatusCode);
            cy.request({
                'method': 'GET', 
                'url': `https://petstore.swagger.io/v2/pet/${createdPetId}`, 
                'headers': {
                    'content-type': 'application/json',
                    'accept': 'application/json'
                },
                failOnStatusCode: false
              }).then(
              (response) => {
                expect(response.status).to.eq(404);
              }
            )
          }
        )
    })
});