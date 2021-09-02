describe("GET /jobs", () => {
    beforeEach(() => {
        cy.exec("npm run resetdb");
    });

    it("should return all jobs.", () => {
        var login_info = {
            username: "blpsr",
            password: "Victory2021!",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var request = {
                method: "GET",
                url: "api/jobs",
                headers: {
                    authorization: response.body.token,
                },
            };

            cy.request(request).then((response) => {
                expect(response.body.length).to.not.equal(0);
                expect(response.body.length).to.equal(1);
                expect(response.body[0].address).to.equal("1733 S. Casablanca St");
                expect(response.body[0].client.full_name).to.equal("Joe Shmoe");
                expect(response.body[0].inspections.length).to.equal(1);
                expect(response.body[0].inspections[0].type).to.equal("House");
            });
        });
    });

    it("should not return all jobs if not logged in.", () => {
        var request = {
            method: "GET",
            url: "api/jobs",
            failOnStatusCode: false,
        };

        cy.request(request).its("status").should("equal", 401);
    });
});

describe("GET /jobs/:id", () => {
    beforeEach(() => {
        cy.exec("npm run resetdb");
    });

    it("should return a specific job.", () => {
        var login_info = {
            username: "blpsr",
            password: "Victory2021!",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            var request = {
                method: "GET",
                url: "api/jobs",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                expect(response.body.length).to.equal(1);

                let jobs = response.body;

                let newRequest = {
                    method: "GET",
                    url: `api/jobs/${jobs[0]._id}`,
                    headers: {
                        authorization: auth,
                    }
                }

                cy.request(newRequest).then((response) => {
                    expect(response.body.address).to.equal("1733 S. Casablanca St");
                    expect(response.body.client.full_name).to.equal("Joe Shmoe");
                    expect(response.body.inspections.length).to.equal(1);
                    expect(response.body.inspections[0].type).to.equal("House");
                });
            });
        });
    });

    it("should note retrieve a specific job with an incorrect ID.", () => {
        var login_info = {
            username: "blpsr",
            password: "Victory2021!",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            var request = {
                method: "GET",
                url: "api/jobs",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                expect(response.body.length).to.equal(1);

                let jobs = response.body;

                let newRequest = {
                    method: "GET",
                    url: `api/jobs/${jobs[0]._id}sss1`,
                    headers: {
                        authorization: auth,
                    },
                    failOnStatusCode: false,
                }

                cy.request(newRequest).then((response) => {
                    expect(response.status).to.equal(400);
                    expect(response.body).to.have.property(
                        "job",
                        "There was no job found"
                    );
                });
            });
        });
    });
});

describe("POST /jobs", () => {
    beforeEach(() => {
        cy.exec("npm run resetdb");
    });

    it("should create a new job if logged in.", () => {
        var login_info = {
            username: "blpsr",
            password: "Victory2021!",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var newObject = {
                inspections: [],
                client: null,
                address: "2298 E. Paradise Ave",
                city: "Visalia",
                state: "CA",
                zipcode: "93292",
                date_created: Date()
            }

            var request = {
                method: "POST",
                url: "api/jobs",
                headers: {
                    authorization: response.body.token,
                },
                body: newObject
            };

            cy.request(request)
                .its("body.address")
                .should("equal", newObject.address);
        });
    });

    it("should not create a new job if not logged in.", () => {
        var request = {
            method: "POST",
            url: "api/jobs",
            failOnStatusCode: false,
        };

        cy.request(request).its("status").should("equal", 401);
    });
});

describe("PATCH /jobs/:id", () => {
    beforeEach(() => {
        cy.exec("npm run resetdb");
    });

    it("should update a job.", () => {
        var login_info = {
            username: "blpsr",
            password: "Victory2021!",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            var request = {
                method: "GET",
                url: "api/jobs",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                expect(response.body.length).to.equal(1);

                let jobs = response.body;

                var update = jobs[0];
                update.address = "123 E New Address";

                let newRequest = {
                    method: "PATCH",
                    url: `api/jobs/${jobs[0]._id}`,
                    headers: {
                        authorization: auth,
                    },
                    body: update
                };

                cy.request(newRequest)
                    .its("body.address")
                    .should("equal", update.address);
            });
        });
    });

    it("should not update a job with incorrect ID.", () => {
        var login_info = {
            username: "blpsr",
            password: "Victory2021!",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            var request = {
                method: "GET",
                url: "api/jobs",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                expect(response.body.length).to.equal(1);

                let jobs = response.body;
                
                var update = jobs[0];

                let newRequest = {
                    method: "PATCH",
                    url: `api/jobs/${jobs[0]._id}sss1`,
                    headers: {
                        authorization: auth,
                    },
                    body: update,
                    failOnStatusCode: false,
                }

                cy.request(newRequest).then((response) => {
                    expect(response.status).to.equal(400);
                    expect(response.body).to.have.property(
                        "job",
                        "There was no job found"
                    );
                });
            });
        });
    });

});

describe("DELETE /jobs/:id", () => {
    beforeEach(() => {
        cy.exec("npm run resetdb");
    });

    it("should delete a job.", () => {
        var login_info = {
            username: "blpsr",
            password: "Victory2021!",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            let request = {
                method: "GET",
                url: "api/jobs",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                let jobs = response.body;

                let newRequest = {
                    method: "DELETE",
                    url: `api/jobs/${jobs[0]._id}`,
                    headers: {
                        authorization: auth,
                    }
                };
    
                cy.request(newRequest).then((response) => {
                    expect(response.body.address).to.equal(jobs[0].address);

                    let request = {
                        method: "GET",
                        url: "api/jobs",
                        headers: {
                            authorization: auth,
                        },
                    };
                    cy.request(request).its("body.length").should("equal", 0);
                });
            });
        });
    });

    it("should not delete a job with if not logged in.", () => {
        var login_info = {
            username: "blpsr",
            password: "Victory2021!",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            var request = {
                method: "GET",
                url: "api/jobs",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                let jobs = response.body;

                let newRequest = {
                    method: "DELETE",
                    url: `api/jobs/${jobs[0]._id}`,
                    failOnStatusCode: false,
                };
        
                cy.request(newRequest).its("status").should("equal", 401);
            });
        });
    });

    it("should not delete a job with incorrect ID.", () => {
        var login_info = {
            username: "blpsr",
            password: "Victory2021!",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            var request = {
                method: "GET",
                url: "api/jobs",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                let jobs = response.body;

                let newRequest = {
                    method: "DELETE",
                    url: `api/jobs/${jobs[0]._id}ssss1`,
                    failOnStatusCode: false,
                    headers: {
                        authorization: auth,
                    },
                };
        
                cy.request(newRequest).then((response) => {
                    expect(response.status).to.equal(400);
                    expect(response.body).to.have.property(
                        "job",
                        "There was no job found"
                    );
                });
            });
        });
    });
});