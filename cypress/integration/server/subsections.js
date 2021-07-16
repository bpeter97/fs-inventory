describe("GET /subsections", () => {
    beforeEach(() => {
        cy.exec("npm run resetdb");
    });

    it("should return all subsections.", () => {
        var login_info = {
            username: "blpsr",
            password: "thePassword",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var request = {
                method: "GET",
                url: "api/subsections",
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

    it("should not return all subsections if not logged in.", () => {
        var request = {
            method: "GET",
            url: "api/subsections",
            failOnStatusCode: false,
        };

        cy.request(request).its("status").should("equal", 401);
    });
});

describe("GET /subsections/:id", () => {
    beforeEach(() => {
        cy.exec("npm run resetdb");
    });

    it("should return a specific subsection.", () => {
        var login_info = {
            username: "blpsr",
            password: "thePassword",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            var request = {
                method: "GET",
                url: "api/subsections",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                expect(response.body.length).to.equal(1);

                let subsections = response.body;

                let newRequest = {
                    method: "GET",
                    url: `api/subsections/${subsections[0]._id}`,
                    headers: {
                        authorization: auth,
                    }
                }

                cy.request(newRequest).then((response) => {
                    expect(response.body).to.have.property('label', subsections[0].label);
                    expect(response.body.status).to.have.property('label', 'Inspected');
                });
            });
        });
    });

    it("should note retrieve a specific subsection with an incorrect ID.", () => {
        var login_info = {
            username: "blpsr",
            password: "thePassword",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            var request = {
                method: "GET",
                url: "api/subsections",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                expect(response.body.length).to.equal(1);

                let subsections = response.body;

                let newRequest = {
                    method: "GET",
                    url: `api/subsections/${subsections[0]._id}sss1`,
                    headers: {
                        authorization: auth,
                    },
                    failOnStatusCode: false,
                }

                cy.request(newRequest).then((response) => {
                    expect(response.status).to.equal(400);
                    expect(response.body).to.have.property(
                        "subsection",
                        "There was no subsection found"
                    );
                });
            });
        });
    });
});

describe("POST /subsections", () => {
    beforeEach(() => {
        cy.exec("npm run resetdb");
    });

    it("should create a new subsection if logged in.", () => {
        var login_info = {
            username: "blpsr",
            password: "thePassword",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var newSubsection = {
                label: "The New subsection",
                status: null,
                notes: [],
                images: []
            }

            var request = {
                method: "POST",
                url: "api/subsections",
                headers: {
                    authorization: response.body.token,
                },
                body: newSubsection
            };

            cy.request(request)
                .its("body.label")
                .should("equal", newSubsection.label);
        });
    });

    it("should not create a new subsection if not logged in.", () => {
        var request = {
            method: "POST",
            url: "api/subsections",
            failOnStatusCode: false,
        };

        cy.request(request).its("status").should("equal", 401);
    });

    it("should not create a new subsection if data is missing", () => {
        var login_info = {
            username: "blpsr",
            password: "thePassword",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var newSubsection = {
                label: null,
                status: null,
                notes: [],
                images: []
            }

            var request = {
                method: "POST",
                url: "api/subsections",
                headers: {
                    authorization: response.body.token,
                },
                body: newSubsection,
                failOnStatusCode: false,
            };

            cy.request(request).then((response) => {
                expect(response.status).to.equal(400);
                expect(response.body).to.have.property(
                    "label",
                    "The subsection's label is missing"
                );
            });
        });
    });
});

describe("PATCH /subsections/:id", () => {
    beforeEach(() => {
        cy.exec("npm run resetdb");
    });

    it("should update a subsection.", () => {
        var login_info = {
            username: "blpsr",
            password: "thePassword",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            var request = {
                method: "GET",
                url: "api/subsections",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                expect(response.body.length).to.equal(1);

                let subsections = response.body;

                var updateSubsection = subsections[0];
                updateSubsection.label = "The Updated Subsection";

                let newRequest = {
                    method: "PATCH",
                    url: `api/subsections/${subsections[0]._id}`,
                    headers: {
                        authorization: auth,
                    },
                    body: updateSubsection
                };

                cy.request(newRequest)
                    .its("body.label")
                    .should("equal", updateSubsection.label);
            });
        });
    });

    it("should not update a subsection with incorrect ID.", () => {
        var login_info = {
            username: "blpsr",
            password: "thePassword",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            var request = {
                method: "GET",
                url: "api/subsections",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                expect(response.body.length).to.equal(1);

                let subsections = response.body;
                
                var updateSubsection = {
                    _id: subsections[0]._id,
                    label: "The New subsection",
                    status: subsections[0].status._id,
                    notes: [],
                    images: []
                }

                let newRequest = {
                    method: "PATCH",
                    url: `api/subsections/${subsections[0]._id}sss1`,
                    headers: {
                        authorization: auth,
                    },
                    body: updateSubsection,
                    failOnStatusCode: false,
                }

                cy.request(newRequest).then((response) => {
                    expect(response.status).to.equal(400);
                    expect(response.body).to.have.property(
                        "subsection",
                        "There was no subsection found"
                    );
                });
            });
        });
    });

    it("should not update a subsection with incorrect fields.", () => {
        var login_info = {
            username: "blpsr",
            password: "thePassword",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            var request = {
                method: "GET",
                url: "api/subsections",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                expect(response.body.length).to.equal(1);

                let subsections = response.body;
                
                var updateSubsection = {
                    _id: subsections[0]._id,
                    label: null,
                    status: subsections[0].status._id,
                    notes: [],
                    images: []
                }

                let newRequest = {
                    method: "PATCH",
                    url: `api/subsections/${subsections[0]._id}`,
                    headers: {
                        authorization: auth,
                    },
                    body: updateSubsection,
                    failOnStatusCode: false,
                }

                cy.request(newRequest).then((response) => {
                    expect(response.status).to.equal(400);
                    expect(response.body).to.have.property(
                        "label",
                        "The subsection's label is missing"
                    );
                });
            });
        });
    });
});

describe("DELETE /subsections/:id", () => {
    beforeEach(() => {
        cy.exec("npm run resetdb");
    });

    it("should delete a subsection.", () => {
        var login_info = {
            username: "blpsr",
            password: "thePassword",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            let request = {
                method: "GET",
                url: "api/subsections",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                let subsections = response.body;

                let newRequest = {
                    method: "DELETE",
                    url: `api/subsections/${subsections[0]._id}`,
                    headers: {
                        authorization: auth,
                    }
                };
    
                cy.request(newRequest).then((response) => {
                    expect(response.body.label).to.equal(subsections[0].label);

                    let request = {
                        method: "GET",
                        url: "api/subsections",
                        headers: {
                            authorization: auth,
                        },
                    };
                    cy.request(request).its("body.length").should("equal", 0);
                });
            });
        });
    });

    it("should not delete a subsection with if not logged in.", () => {
        var login_info = {
            username: "blpsr",
            password: "thePassword",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            var request = {
                method: "GET",
                url: "api/subsections",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                let subsections = response.body;

                let newRequest = {
                    method: "DELETE",
                    url: `api/subsections/${subsections[0]._id}`,
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
                url: "api/subsections",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                let subsections = response.body;

                let newRequest = {
                    method: "DELETE",
                    url: `api/subsections/${subsections[0]._id}ssss1`,
                    failOnStatusCode: false,
                    headers: {
                        authorization: auth,
                    },
                };
        
                cy.request(newRequest).then((response) => {
                    expect(response.status).to.equal(400);
                    expect(response.body).to.have.property(
                        "subsection",
                        "There was no subsection found"
                    );
                });
            });
        });
    });
});