describe("GET /status", () => {
    beforeEach(() => {
        cy.exec("npm run resetdb");
    });

    it("should return all status registered.", () => {
        var login_info = {
            username: "blpsr",
            password: "thePassword",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var request = {
                method: "GET",
                url: "api/status",
                headers: {
                    authorization: response.body.token,
                },
            };

            cy.request(request)
                .its("body.length")
                .should("not.equal", 0)
                .and("equal", 4);
        });
    });

    it("should not return all status if not logged in.", () => {
        var request = {
            method: "GET",
            url: "api/status",
            failOnStatusCode: false,
        };

        cy.request(request).its("status").should("equal", 401);
    });
});

describe("POST /status", () => {
    beforeEach(() => {
        cy.exec("npm run resetdb");
    });

    it("should create a new status if logged in.", () => {
        var login_info = {
            username: "blpsr",
            password: "thePassword",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var newStatus = {
                label: "Not Applicable",
                initials: "N/A"
            }

            var request = {
                method: "POST",
                url: "api/status",
                headers: {
                    authorization: response.body.token,
                },
                body: newStatus
            };

            cy.request(request)
                .its("body.label")
                .should("equal", newStatus.label);
        });
    });

    it("should not create a new status if not logged in.", () => {
        var request = {
            method: "POST",
            url: "api/status",
            failOnStatusCode: false,
        };

        cy.request(request).its("status").should("equal", 401);
    });

    it("should not create a new status if the label already exists.", () => {
        var login_info = {
            username: "blpsr",
            password: "thePassword",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var newStatus = {
                label: "Inspected",
                initials: "IN"
            }

            var request = {
                method: "POST",
                url: "api/status",
                headers: {
                    authorization: response.body.token,
                },
                body: newStatus,
                failOnStatusCode: false,
            };

            cy.request(request).then((response) => {
                expect(response.status).to.equal(400);
                expect(response.body).to.have.property(
                    "label",
                    "A status with that label already exists"
                );
            });
        });
    });

    it("should not create a new status if the initials already exists.", () => {
        var login_info = {
            username: "blpsr",
            password: "thePassword",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var newStatus = {
                label: "Inspected NEW",
                initials: "IN"
            }

            var request = {
                method: "POST",
                url: "api/status",
                headers: {
                    authorization: response.body.token,
                },
                body: newStatus,
                failOnStatusCode: false,
            };

            cy.request(request).then((response) => {
                expect(response.status).to.equal(400);
                expect(response.body).to.have.property(
                    "initials",
                    "A status with the initials already exists"
                );
            });
        });
    });

    it("should not create a new status if label or initials are missing", () => {
        var login_info = {
            username: "blpsr",
            password: "thePassword",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var newStatus = {
                label: null,
                initials: "NEW"
            }

            var request = {
                method: "POST",
                url: "api/status",
                headers: {
                    authorization: response.body.token,
                },
                body: newStatus,
                failOnStatusCode: false,
            };

            cy.request(request).then((response) => {
                expect(response.status).to.equal(400);
                expect(response.body).to.have.property(
                    "label",
                    "The label field is empty"
                );
            });
        });
    });
});

describe("GET /status/:id", () => {
    beforeEach(() => {
        cy.exec("npm run resetdb");
    });

    it("should return a specific status.", () => {
        var login_info = {
            username: "blpsr",
            password: "thePassword",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            var request = {
                method: "GET",
                url: "api/status",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                expect(response.body.length).to.equal(4);

                let status = response.body;

                let newRequest = {
                    method: "GET",
                    url: `api/status/${status[0]._id}`,
                    headers: {
                        authorization: auth,
                    }
                }

                cy.request(newRequest)
                    .its("body.label")
                    .should("equal", status[0].label);
            });
        });
    });

    it("should note retrieve a specific status with an incorrect ID.", () => {
        var login_info = {
            username: "blpsr",
            password: "thePassword",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            var request = {
                method: "GET",
                url: "api/status",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                expect(response.body.length).to.equal(4);

                let status = response.body;

                let newRequest = {
                    method: "GET",
                    url: `api/status/${status[0]._id}sss1`,
                    headers: {
                        authorization: auth,
                    },
                    failOnStatusCode: false,
                }

                cy.request(newRequest).then((response) => {
                    expect(response.status).to.equal(400);
                    expect(response.body).to.have.property(
                        "status",
                        "There was no status found."
                    );
                });
            });
        });
    });
});

describe("PATCH /status/:id", () => {
    beforeEach(() => {
        cy.exec("npm run resetdb");
    });

    it.skip("should update a status.", () => {});
    it.skip("should not update a status with incorrect ID.", () => {});
    it.skip("should not update a status with incorrect fields.", () => {});
    it.skip("should not update a status to one that has a label that already exists.", () => {});
    it.skip("should not update a status to one that has initials that already exists.", () => {});
});

describe("DELETE /status/:id", () => {
    beforeEach(() => {
        cy.exec("npm run resetdb");
    });

    it.skip("should delete a status.", () => {});
    it.skip("should not delete a status with incorrect ID.", () => {});
});