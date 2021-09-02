describe("GET /sections", () => {
    beforeEach(() => {
        cy.exec("npm run resetdb");
    });

    it("should return all sections.", () => {
        var login_info = {
            username: "blpsr",
            password: "Victory2021!",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var request = {
                method: "GET",
                url: "api/sections",
                headers: {
                    authorization: response.body.token,
                },
            };

            cy.request(request).then((response) => {
                expect(response.body.length).to.not.equal(0);
                expect(response.body.length).to.equal(1);
                expect(response.body[0].sub_sections[0].label).to.equal("SubSection Label");
                expect(response.body[0].requirements[0].label).to.equal("Section Requirement");
            });
        });
    });

    it("should not return all sections if not logged in.", () => {
        var request = {
            method: "GET",
            url: "api/sections",
            failOnStatusCode: false,
        };

        cy.request(request).its("status").should("equal", 401);
    });
});

describe("GET /sections/:id", () => {
    beforeEach(() => {
        cy.exec("npm run resetdb");
    });

    it("should return a specific section.", () => {
        var login_info = {
            username: "blpsr",
            password: "Victory2021!",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            var request = {
                method: "GET",
                url: "api/sections",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                expect(response.body.length).to.equal(1);

                let sections = response.body;

                let newRequest = {
                    method: "GET",
                    url: `api/sections/${sections[0]._id}`,
                    headers: {
                        authorization: auth,
                    }
                }

                cy.request(newRequest).then((response) => {
                    expect(response.body).to.have.property('label', sections[0].label);
                    expect(response.body.sub_sections[0].label).to.equal("SubSection Label");
                    expect(response.body.requirements[0].label).to.equal("Section Requirement");
                });
            });
        });
    });

    it("should note retrieve a specific section with an incorrect ID.", () => {
        var login_info = {
            username: "blpsr",
            password: "Victory2021!",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            var request = {
                method: "GET",
                url: "api/sections",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                expect(response.body.length).to.equal(1);

                let sections = response.body;

                let newRequest = {
                    method: "GET",
                    url: `api/sections/${sections[0]._id}sss1`,
                    headers: {
                        authorization: auth,
                    },
                    failOnStatusCode: false,
                }

                cy.request(newRequest).then((response) => {
                    expect(response.status).to.equal(400);
                    expect(response.body).to.have.property(
                        "section",
                        "There was no section found"
                    );
                });
            });
        });
    });
});

describe("POST /sections", () => {
    beforeEach(() => {
        cy.exec("npm run resetdb");
    });

    it("should create a new section if logged in.", () => {
        var login_info = {
            username: "blpsr",
            password: "Victory2021!",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var newSection = {
                label: "The New Section",
                notes: [],
                notes: [],
                requirements: []
            }

            var request = {
                method: "POST",
                url: "api/sections",
                headers: {
                    authorization: response.body.token,
                },
                body: newSection
            };

            cy.request(request)
                .its("body.label")
                .should("equal", newSection.label);
        });
    });

    it("should not create a new section if not logged in.", () => {
        var request = {
            method: "POST",
            url: "api/sections",
            failOnStatusCode: false,
        };

        cy.request(request).its("status").should("equal", 401);
    });

    it("should not create a new section if data is missing", () => {
        var login_info = {
            username: "blpsr",
            password: "Victory2021!",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var newSection = {
                label: null,
                notes: [],
                notes: [],
                requirements: []
            }

            var request = {
                method: "POST",
                url: "api/sections",
                headers: {
                    authorization: response.body.token,
                },
                body: newSection,
                failOnStatusCode: false,
            };

            cy.request(request).then((response) => {
                expect(response.status).to.equal(400);
                expect(response.body).to.have.property(
                    "label",
                    "The section's label is missing"
                );
            });
        });
    });
});

describe("PATCH /sections/:id", () => {
    beforeEach(() => {
        cy.exec("npm run resetdb");
    });

    it("should update a section.", () => {
        var login_info = {
            username: "blpsr",
            password: "Victory2021!",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            var request = {
                method: "GET",
                url: "api/sections",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                expect(response.body.length).to.equal(1);

                let sections = response.body;

                var update = sections[0];
                update.label = "Updated Section";

                let newRequest = {
                    method: "PATCH",
                    url: `api/sections/${sections[0]._id}`,
                    headers: {
                        authorization: auth,
                    },
                    body: update
                };

                cy.request(newRequest)
                    .its("body.label")
                    .should("equal", update.label);
            });
        });
    });

    it("should not update a section with incorrect ID.", () => {
        var login_info = {
            username: "blpsr",
            password: "Victory2021!",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            var request = {
                method: "GET",
                url: "api/sections",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                expect(response.body.length).to.equal(1);

                let sections = response.body;
                
                var update = sections[0];

                let newRequest = {
                    method: "PATCH",
                    url: `api/sections/${sections[0]._id}sss1`,
                    headers: {
                        authorization: auth,
                    },
                    body: update,
                    failOnStatusCode: false,
                }

                cy.request(newRequest).then((response) => {
                    expect(response.status).to.equal(400);
                    expect(response.body).to.have.property(
                        "section",
                        "There was no section found"
                    );
                });
            });
        });
    });

    it("should not update a section with incorrect fields.", () => {
        var login_info = {
            username: "blpsr",
            password: "Victory2021!",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            var request = {
                method: "GET",
                url: "api/sections",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                expect(response.body.length).to.equal(1);

                let sections = response.body;
                
                var update = sections[0];
                update.label = null;

                let newRequest = {
                    method: "PATCH",
                    url: `api/sections/${sections[0]._id}`,
                    headers: {
                        authorization: auth,
                    },
                    body: update,
                    failOnStatusCode: false,
                }

                cy.request(newRequest).then((response) => {
                    expect(response.status).to.equal(400);
                    expect(response.body).to.have.property(
                        "label",
                        "The section's label is missing"
                    );
                });
            });
        });
    });
});

describe("DELETE /sections/:id", () => {
    beforeEach(() => {
        cy.exec("npm run resetdb");
    });

    it("should delete a section.", () => {
        var login_info = {
            username: "blpsr",
            password: "Victory2021!",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            let request = {
                method: "GET",
                url: "api/sections",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                let sections = response.body;

                let newRequest = {
                    method: "DELETE",
                    url: `api/sections/${sections[0]._id}`,
                    headers: {
                        authorization: auth,
                    }
                };
    
                cy.request(newRequest).then((response) => {
                    expect(response.body.label).to.equal(sections[0].label);

                    let request = {
                        method: "GET",
                        url: "api/sections",
                        headers: {
                            authorization: auth,
                        },
                    };
                    cy.request(request).its("body.length").should("equal", 0);
                });
            });
        });
    });

    it("should not delete a section with if not logged in.", () => {
        var login_info = {
            username: "blpsr",
            password: "Victory2021!",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            var request = {
                method: "GET",
                url: "api/sections",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                let sections = response.body;

                let newRequest = {
                    method: "DELETE",
                    url: `api/sections/${sections[0]._id}`,
                    failOnStatusCode: false,
                };
        
                cy.request(newRequest).its("status").should("equal", 401);
            });
        });
    });

    it("should not delete a status with incorrect ID.", () => {
        var login_info = {
            username: "blpsr",
            password: "Victory2021!",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            var request = {
                method: "GET",
                url: "api/sections",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                let sections = response.body;

                let newRequest = {
                    method: "DELETE",
                    url: `api/sections/${sections[0]._id}ssss1`,
                    failOnStatusCode: false,
                    headers: {
                        authorization: auth,
                    },
                };
        
                cy.request(newRequest).then((response) => {
                    expect(response.status).to.equal(400);
                    expect(response.body).to.have.property(
                        "section",
                        "There was no section found"
                    );
                });
            });
        });
    });
});