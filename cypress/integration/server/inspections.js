describe("GET /inspections", () => {
    beforeEach(() => {
        cy.exec("npm run resetdb");
    });

    it("should return all inspections.", () => {
        var login_info = {
            username: "blpsr",
            password: "Victory2021!",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var request = {
                method: "GET",
                url: "api/inspections",
                headers: {
                    authorization: response.body.token,
                },
            };

            cy.request(request).then((response) => {
                expect(response.body.length).to.not.equal(0);
                expect(response.body.length).to.equal(1);
                expect(response.body[0].type).to.equal("House");
                expect(response.body[0].sections[0].label).to.equal("Section Label");
                expect(response.body[0].sections[0].requirements[0].label).to.equal("Section Requirement");
            });
        });
    });

    it("should not return all inspections if not logged in.", () => {
        var request = {
            method: "GET",
            url: "api/inspections",
            failOnStatusCode: false,
        };

        cy.request(request).its("status").should("equal", 401);
    });
});

describe("GET /inspections/:id", () => {
    beforeEach(() => {
        cy.exec("npm run resetdb");
    });

    it("should return a specific inspection.", () => {
        var login_info = {
            username: "blpsr",
            password: "Victory2021!",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            var request = {
                method: "GET",
                url: "api/inspections",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                expect(response.body.length).to.equal(1);

                let inspections = response.body;

                let newRequest = {
                    method: "GET",
                    url: `api/inspections/${inspections[0]._id}`,
                    headers: {
                        authorization: auth,
                    }
                }

                cy.request(newRequest).then((response) => {
                    expect(response.body.type).to.equal("House");
                    expect(response.body.sections[0].label).to.equal("Section Label");
                    expect(response.body.sections[0].requirements[0].label).to.equal("Section Requirement");
                });
            });
        });
    });

    it("should note retrieve a specific isnpection with an incorrect ID.", () => {
        var login_info = {
            username: "blpsr",
            password: "Victory2021!",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            var request = {
                method: "GET",
                url: "api/inspections",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                expect(response.body.length).to.equal(1);

                let inspections = response.body;

                let newRequest = {
                    method: "GET",
                    url: `api/inspections/${inspections[0]._id}sss1`,
                    headers: {
                        authorization: auth,
                    },
                    failOnStatusCode: false,
                }

                cy.request(newRequest).then((response) => {
                    expect(response.status).to.equal(400);
                    expect(response.body).to.have.property(
                        "inspection",
                        "There was no inspection found"
                    );
                });
            });
        });
    });
});

describe("POST /inspections", () => {
    beforeEach(() => {
        cy.exec("npm run resetdb");
    });

    it("should create a new inspection if logged in.", () => {
        var login_info = {
            username: "blpsr",
            password: "Victory2021!",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            // -------------------------------------------------------------------
            var newObject = {
                sections: [],
                type: "Pool",
                num_of_stories: null,
                year_built: 2020,
                people_at_inspection: "Buyer(s) and Agent",
                inspector: null,
                date_of_inspection: new Date()
            }

            var request = {
                method: "POST",
                url: "api/inspections",
                headers: {
                    authorization: response.body.token,
                },
                body: newObject
            };

            cy.request(request)
                .its("body.type")
                .should("equal", newObject.type);
        });
    });

    it("should not create a new inspection if not logged in.", () => {
        var request = {
            method: "POST",
            url: "api/inspections",
            failOnStatusCode: false,
        };

        cy.request(request).its("status").should("equal", 401);
    });

    it("should not create a new inspection if data is missing", () => {
        var login_info = {
            username: "blpsr",
            password: "Victory2021!",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var newObject = {
                sections: [],
                type: null,
                num_of_stories: null,
                year_built: 2020,
                people_at_inspection: "Buyer(s) and Agent",
                inspector: null,
                date_of_inspection: Date()
            }

            var request = {
                method: "POST",
                url: "api/inspections",
                headers: {
                    authorization: response.body.token,
                },
                body: newObject,
                failOnStatusCode: false,
            };

            cy.request(request).then((response) => {
                expect(response.status).to.equal(400);
                expect(response.body).to.have.property(
                    "type",
                    "The inspection's type is missing"
                );
            });
        });
    });
});

describe("PATCH /inspections/:id", () => {
    beforeEach(() => {
        cy.exec("npm run resetdb");
    });

    it("should update a inspection.", () => {
        var login_info = {
            username: "blpsr",
            password: "Victory2021!",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            var request = {
                method: "GET",
                url: "api/inspections",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                expect(response.body.length).to.equal(1);

                let inspections = response.body;

                var update = inspections[0];
                update.type = "Houses";

                let newRequest = {
                    method: "PATCH",
                    url: `api/inspections/${inspections[0]._id}`,
                    headers: {
                        authorization: auth,
                    },
                    body: update
                };

                cy.request(newRequest)
                    .its("body.type")
                    .should("equal", update.type);
            });
        });
    });

    it("should not update a inspection with incorrect ID.", () => {
        var login_info = {
            username: "blpsr",
            password: "Victory2021!",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            var request = {
                method: "GET",
                url: "api/inspections",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                expect(response.body.length).to.equal(1);

                let inspections = response.body;
                
                var update = inspections[0];

                let newRequest = {
                    method: "PATCH",
                    url: `api/inspections/${inspections[0]._id}sss1`,
                    headers: {
                        authorization: auth,
                    },
                    body: update,
                    failOnStatusCode: false,
                }

                cy.request(newRequest).then((response) => {
                    expect(response.status).to.equal(400);
                    expect(response.body).to.have.property(
                        "inspection",
                        "There was no inspection found"
                    );
                });
            });
        });
    });

    it("should not update a inspection with incorrect fields.", () => {
        var login_info = {
            username: "blpsr",
            password: "Victory2021!",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            var request = {
                method: "GET",
                url: "api/inspections",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                expect(response.body.length).to.equal(1);

                let inspections = response.body;
                
                var update = inspections[0];
                update.type = null;
                console.log(update);

                let newRequest = {
                    method: "PATCH",
                    url: `api/inspections/${inspections[0]._id}`,
                    headers: {
                        authorization: auth,
                    },
                    body: update,
                    failOnStatusCode: false,
                }

                cy.request(newRequest).then((response) => {
                    expect(response.status).to.equal(400);
                    expect(response.body).to.have.property(
                        "type",
                        "The inspection's type is missing"
                    );
                });
            });
        });
    });
});

describe("DELETE /inspections/:id", () => {
    beforeEach(() => {
        cy.exec("npm run resetdb");
    });

    it("should delete a inspection.", () => {
        var login_info = {
            username: "blpsr",
            password: "Victory2021!",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            let request = {
                method: "GET",
                url: "api/inspections",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                let inspections = response.body;

                let newRequest = {
                    method: "DELETE",
                    url: `api/inspections/${inspections[0]._id}`,
                    headers: {
                        authorization: auth,
                    }
                };
    
                cy.request(newRequest).then((response) => {
                    expect(response.body.type).to.equal(inspections[0].type);

                    let request = {
                        method: "GET",
                        url: "api/inspections",
                        headers: {
                            authorization: auth,
                        },
                    };
                    cy.request(request).its("body.length").should("equal", 0);
                });
            });
        });
    });

    it("should not delete a inspection with if not logged in.", () => {
        var login_info = {
            username: "blpsr",
            password: "Victory2021!",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            var request = {
                method: "GET",
                url: "api/inspections",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                let inspections = response.body;

                let newRequest = {
                    method: "DELETE",
                    url: `api/inspections/${inspections[0]._id}`,
                    failOnStatusCode: false,
                };
        
                cy.request(newRequest).its("status").should("equal", 401);
            });
        });
    });

    it("should not delete a inspection with incorrect ID.", () => {
        var login_info = {
            username: "blpsr",
            password: "Victory2021!",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            var request = {
                method: "GET",
                url: "api/inspections",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                let inspections = response.body;

                let newRequest = {
                    method: "DELETE",
                    url: `api/inspections/${inspections[0]._id}ssss1`,
                    failOnStatusCode: false,
                    headers: {
                        authorization: auth,
                    },
                };
        
                cy.request(newRequest).then((response) => {
                    expect(response.status).to.equal(400);
                    expect(response.body).to.have.property(
                        "inspection",
                        "There was no inspection found"
                    );
                });
            });
        });
    });
});