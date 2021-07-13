describe("GET /requirements", () => {
    beforeEach(() => {
        cy.exec("npm run resetdb");
    });

    it("should return all requirements.", () => {
        var login_info = {
            username: "blpsr",
            password: "thePassword",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var request = {
                method: "GET",
                url: "api/requirements",
                headers: {
                    authorization: response.body.token,
                },
            };

            cy.request(request)
                .its("body.length")
                .should("not.equal", 0)
                .and("equal", 1);
        });
    });

    it("should not return all requirements if not logged in.", () => {
        var request = {
            method: "GET",
            url: "api/requirements",
            failOnStatusCode: false,
        };

        cy.request(request).its("status").should("equal", 401);
    });
});

describe("GET /requirements/:id", () => {
    beforeEach(() => {
        cy.exec("npm run resetdb");
    });

    it("should return a specific requirement.", () => {
        var login_info = {
            username: "blpsr",
            password: "thePassword",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            var request = {
                method: "GET",
                url: "api/requirements",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                expect(response.body.length).to.equal(1);

                let requirements = response.body;

                let newRequest = {
                    method: "GET",
                    url: `api/requirements/${requirements[0]._id}`,
                    headers: {
                        authorization: auth,
                    }
                }

                cy.request(newRequest)
                    .its("body.label")
                    .should("equal", requirements[0].label);
            });
        });
    });

    it("should note retrieve a specific requirement with an incorrect ID.", () => {
        var login_info = {
            username: "blpsr",
            password: "thePassword",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            var request = {
                method: "GET",
                url: "api/requirements",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                expect(response.body.length).to.equal(1);

                let requirements = response.body;

                let newRequest = {
                    method: "GET",
                    url: `api/requirements/${requirements[0]._id}sss1`,
                    headers: {
                        authorization: auth,
                    },
                    failOnStatusCode: false,
                }

                cy.request(newRequest).then((response) => {
                    expect(response.status).to.equal(400);
                    expect(response.body).to.have.property(
                        "requirement",
                        "There was no requirement found"
                    );
                });
            });
        });
    });
});

describe("POST /requirements", () => {
    beforeEach(() => {
        cy.exec("npm run resetdb");
    });

    it("should create a new requirement if logged in.", () => {
        var login_info = {
            username: "blpsr",
            password: "thePassword",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var newRequirement = {
                is_boolean: false,
                is_number: false,
                label: "The New Requirement",
                value_boolean: null,
                value_character: "Character value",
                value_int: null
            }

            var request = {
                method: "POST",
                url: "api/requirements",
                headers: {
                    authorization: response.body.token,
                },
                body: newRequirement
            };

            cy.request(request)
                .its("body.label")
                .should("equal", newRequirement.label);
        });
    });

    it("should not create a new requirement if not logged in.", () => {
        var request = {
            method: "POST",
            url: "api/requirements",
            failOnStatusCode: false,
        };

        cy.request(request).its("status").should("equal", 401);
    });

    it("should not create a new requirement if data is missing", () => {
        var login_info = {
            username: "blpsr",
            password: "thePassword",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var newRequirement = {
                is_boolean: false,
                is_number: false,
                label: null,
                value_boolean: null,
                value_character: "Character value",
                value_int: null
            }

            var request = {
                method: "POST",
                url: "api/requirements",
                headers: {
                    authorization: response.body.token,
                },
                body: newRequirement,
                failOnStatusCode: false,
            };

            cy.request(request).then((response) => {
                expect(response.status).to.equal(400);
                expect(response.body).to.have.property(
                    "label",
                    "The requirement's label is missing"
                );
            });
        });
    });
});

describe("PATCH /requirements/:id", () => {
    beforeEach(() => {
        cy.exec("npm run resetdb");
    });

    it("should update a requirement.", () => {
        var login_info = {
            username: "blpsr",
            password: "thePassword",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            var request = {
                method: "GET",
                url: "api/requirements",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                expect(response.body.length).to.equal(1);

                let requirements = response.body;
                
                let updateRequirement = {
                    _id: requirements[0]._id,
                    is_boolean: false,
                    is_number: false,
                    label: "The Updated Requirement",
                    value_boolean: null,
                    value_character: "Character value",
                    value_int: null
                };

                let newRequest = {
                    method: "PATCH",
                    url: `api/requirements/${requirements[0]._id}`,
                    headers: {
                        authorization: auth,
                    },
                    body: updateRequirement
                };

                cy.request(newRequest)
                    .its("body.label")
                    .should("equal", updateRequirement.label);
            });
        });
    });

    it("should not update a requirement with incorrect ID.", () => {
        var login_info = {
            username: "blpsr",
            password: "thePassword",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            var request = {
                method: "GET",
                url: "api/requirements",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                expect(response.body.length).to.equal(1);

                let requirements = response.body;
                
                let updateRequirement = {
                    _id: requirements[0]._id,
                    is_boolean: false,
                    is_number: false,
                    label: "The Updated Requirement",
                    value_boolean: null,
                    value_character: "Character value",
                    value_int: null
                };

                let newRequest = {
                    method: "PATCH",
                    url: `api/requirements/${requirements[0]._id}sss1`,
                    headers: {
                        authorization: auth,
                    },
                    body: updateRequirement,
                    failOnStatusCode: false,
                }

                cy.request(newRequest).then((response) => {
                    expect(response.status).to.equal(400);
                    expect(response.body).to.have.property(
                        "requirement",
                        "There was no requirement found"
                    );
                });
            });
        });
    });

    it("should not update a client with incorrect fields.", () => {
        var login_info = {
            username: "blpsr",
            password: "thePassword",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            var request = {
                method: "GET",
                url: "api/requirements",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                expect(response.body.length).to.equal(1);

                let requirements = response.body;
                
                let updateRequirement = {
                    _id: requirements[0]._id,
                    is_boolean: false,
                    is_number: false,
                    label: null,
                    value_boolean: null,
                    value_character: "Character value",
                    value_int: null
                };

                let newRequest = {
                    method: "PATCH",
                    url: `api/requirements/${requirements[0]._id}`,
                    headers: {
                        authorization: auth,
                    },
                    body: updateRequirement,
                    failOnStatusCode: false,
                }

                cy.request(newRequest).then((response) => {
                    expect(response.status).to.equal(400);
                    expect(response.body).to.have.property(
                        "label",
                        "The requirement's label is missing"
                    );
                });
            });
        });
    });
});

describe("DELETE /requirements/:id", () => {
    beforeEach(() => {
        cy.exec("npm run resetdb");
    });

    it("should delete a requirement.", () => {
        var login_info = {
            username: "blpsr",
            password: "thePassword",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            let request = {
                method: "GET",
                url: "api/requirements",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                let requirements = response.body;

                let newRequest = {
                    method: "DELETE",
                    url: `api/requirements/${requirements[0]._id}`,
                    headers: {
                        authorization: auth,
                    }
                };
    
                cy.request(newRequest).then((response) => {
                    expect(response.body.label).to.equal(requirements[0].label);

                    let request = {
                        method: "GET",
                        url: "api/requirements",
                        headers: {
                            authorization: auth,
                        },
                    };
                    cy.request(request).its("body.length").should("equal", 0);
                });
            });
        });
    });

    it("should not delete a requirement with if not logged in.", () => {
        var login_info = {
            username: "blpsr",
            password: "thePassword",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            var request = {
                method: "GET",
                url: "api/requirements",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                let requirements = response.body;

                let newRequest = {
                    method: "DELETE",
                    url: `api/requirements/${requirements[0]._id}`,
                    failOnStatusCode: false,
                };
        
                cy.request(newRequest).its("status").should("equal", 401);
            });
        });
    });

    it("should not delete a status with incorrect ID.", () => {
        var login_info = {
            username: "blpsr",
            password: "thePassword",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            var request = {
                method: "GET",
                url: "api/requirements",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                let requirements = response.body;

                let newRequest = {
                    method: "DELETE",
                    url: `api/requirements/${requirements[0]._id}ssss1`,
                    failOnStatusCode: false,
                    headers: {
                        authorization: auth,
                    },
                };
        
                cy.request(newRequest).then((response) => {
                    expect(response.status).to.equal(400);
                    expect(response.body).to.have.property(
                        "requirement",
                        "There was no requirement found"
                    );
                });
            });
        });
    });
});