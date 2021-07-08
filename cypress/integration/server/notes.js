describe("GET /notes", () => {
    beforeEach(() => {
        cy.exec("npm run resetdb");
    });

    it("should return all notes registered.", () => {
        var login_info = {
            username: "blpsr",
            password: "thePassword",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var request = {
                method: "GET",
                url: "api/notes",
                headers: {
                    authorization: response.body.token,
                },
            };

            cy.request(request)
                .its("body.length")
                .should("not.equal", 0)
                .and("equal", 2);
        });
    });

    it("should not return all notes if not logged in.", () => {
        var request = {
            method: "GET",
            url: "api/notes",
            failOnStatusCode: false,
        };

        cy.request(request).its("status").should("equal", 401);
    });
});

describe("POST /notes", () => {
    beforeEach(() => {
        cy.exec("npm run resetdb");
    });

    it("should not create a new note if not logged in.", () => {
        var request = {
            method: "POST",
            url: "api/notes",
        };

        cy.request(request).its("status").should("equal", 401);
    });

    it("should create a new note and have three notes in the database.", () => {
        var login_info = {
            username: "blpsr",
            password: "thePassword",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var newNote = {
                note: "The newest note."
            }

            var request = {
                method: "POST",
                url: "api/notes",
                headers: {
                    authorization: response.body.token,
                },
                body: newNote
            };

            cy.request(request)
                .its("body.length")
                .should("not.equal", 0)
                .and("equal", 3);
        });
    });

    it("should not create a new note if missing data.", () => {
        var login_info = {
            username: "blpsr",
            password: "thePassword",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var newNote = {
                note: null
            }

            var request = {
                method: "POST",
                url: "api/notes",
                headers: {
                    authorization: response.body.token,
                },
                body: newNote
            };

            cy.request(request).then((response) => {
                expect(response.status).to.equal(400);
            
            });
        });
    });
});

describe("PATCH /notes", () => {
    beforeEach(() => {
        cy.exec("npm run resetdb");
    });
});

describe("DELETE /notes", () => {
    beforeEach(() => {
        cy.exec("npm run resetdb");
    });
});