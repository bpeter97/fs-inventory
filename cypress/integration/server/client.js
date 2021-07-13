describe("GET /clients", () => {
    beforeEach(() => {
        cy.exec("npm run resetdb");
    });

    it("should return all clients.", () => {
        var login_info = {
            username: "blpsr",
            password: "thePassword",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var request = {
                method: "GET",
                url: "api/clients",
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

    it("should not return all clients if not logged in.", () => {
        var request = {
            method: "GET",
            url: "api/clients",
            failOnStatusCode: false,
        };

        cy.request(request).its("status").should("equal", 401);
    });
});

describe("POST /clients", () => {
    beforeEach(() => {
        cy.exec("npm run resetdb");
    });

    it("should create a new client if logged in.", () => {
        var login_info = {
            username: "blpsr",
            password: "thePassword",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var newClient = {
                full_name: "Jeremy Smith",
                phone_number: "555-999-9999"
            }

            var request = {
                method: "POST",
                url: "api/clients",
                headers: {
                    authorization: response.body.token,
                },
                body: newClient
            };

            cy.request(request)
                .its("body.full_name")
                .should("equal", newClient.full_name);
        });
    });

    it("should not create a new client if not logged in.", () => {
        var request = {
            method: "POST",
            url: "api/clients",
            failOnStatusCode: false,
        };

        cy.request(request).its("status").should("equal", 401);
    });

    it("should not create a new client if the client already exists.", () => {
        var login_info = {
            username: "blpsr",
            password: "thePassword",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var newClient = {
                full_name: "Joe Shmoe",
                phone_number: "555-999-9999"
            }

            var request = {
                method: "POST",
                url: "api/clients",
                headers: {
                    authorization: response.body.token,
                },
                body: newClient,
                failOnStatusCode: false,
            };

            cy.request(request).then((response) => {
                expect(response.status).to.equal(400);
                expect(response.body).to.have.property(
                    "full_name",
                    "A client with that name already exist"
                );
            });
        });
    });

    it("should not create a new client if data is missing", () => {
        var login_info = {
            username: "blpsr",
            password: "thePassword",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var newClient = {
                full_name: null,
                phone_number: "555-999-9999"
            }

            var request = {
                method: "POST",
                url: "api/clients",
                headers: {
                    authorization: response.body.token,
                },
                body: newClient,
                failOnStatusCode: false,
            };

            cy.request(request).then((response) => {
                expect(response.status).to.equal(400);
                expect(response.body).to.have.property(
                    "full_name",
                    "The client's name is missing"
                );
            });
        });
    });
});

describe("GET /clients/:id", () => {
    beforeEach(() => {
        cy.exec("npm run resetdb");
    });

    it("should return a specific clients.", () => {
        var login_info = {
            username: "blpsr",
            password: "thePassword",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            var request = {
                method: "GET",
                url: "api/clients",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                expect(response.body.length).to.equal(1);

                let clients = response.body;

                let newRequest = {
                    method: "GET",
                    url: `api/clients/${clients[0]._id}`,
                    headers: {
                        authorization: auth,
                    }
                }

                cy.request(newRequest)
                    .its("body.full_name")
                    .should("equal", clients[0].full_name);
            });
        });
    });

    it("should note retrieve a specific clients with an incorrect ID.", () => {
        var login_info = {
            username: "blpsr",
            password: "thePassword",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            var request = {
                method: "GET",
                url: "api/clients",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                expect(response.body.length).to.equal(1);

                let clients = response.body;

                let newRequest = {
                    method: "GET",
                    url: `api/clients/${clients[0]._id}sss1`,
                    headers: {
                        authorization: auth,
                    },
                    failOnStatusCode: false,
                }

                cy.request(newRequest).then((response) => {
                    expect(response.status).to.equal(400);
                    expect(response.body).to.have.property(
                        "client",
                        "There was no client found"
                    );
                });
            });
        });
    });
});

describe("PATCH /clients/:id", () => {
    beforeEach(() => {
        cy.exec("npm run resetdb");
    });

    it("should update a client.", () => {
        var login_info = {
            username: "blpsr",
            password: "thePassword",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            var request = {
                method: "GET",
                url: "api/clients",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                expect(response.body.length).to.equal(1);

                let clients = response.body;
                
                let updateClient = {
                    _id: clients[0]._id,
                    full_name: clients[0].full_name,
                    phone_number: "333-333-3333"
                };

                let newRequest = {
                    method: "PATCH",
                    url: `api/clients/${clients[0]._id}`,
                    headers: {
                        authorization: auth,
                    },
                    body: updateClient
                };

                cy.request(newRequest)
                    .its("body.phone_number")
                    .should("equal", updateClient.phone_number);
            });
        });
    });

    it("should not update a client with incorrect ID.", () => {
        var login_info = {
            username: "blpsr",
            password: "thePassword",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            var request = {
                method: "GET",
                url: "api/clients",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                expect(response.body.length).to.equal(1);

                let clients = response.body;
                
                let updateClient = {
                    _id: clients[0]._id,
                    full_name: clients[0].full_name,
                    phone_number: "333-333-3333"
                };

                let newRequest = {
                    method: "PATCH",
                    url: `api/clients/${clients[0]._id}sss1`,
                    headers: {
                        authorization: auth,
                    },
                    body: updateClient,
                    failOnStatusCode: false,
                }

                cy.request(newRequest).then((response) => {
                    expect(response.status).to.equal(400);
                    expect(response.body).to.have.property(
                        "client",
                        "There was no client found"
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
                url: "api/clients",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                expect(response.body.length).to.equal(1);

                let clients = response.body;
                
                let updateClient = {
                    _id: clients[0]._id,
                    full_name: null,
                    phone_number: "333-333-3333"
                };

                let newRequest = {
                    method: "PATCH",
                    url: `api/clients/${clients[0]._id}`,
                    headers: {
                        authorization: auth,
                    },
                    body: updateClient,
                    failOnStatusCode: false,
                }

                cy.request(newRequest).then((response) => {
                    expect(response.status).to.equal(400);
                    expect(response.body).to.have.property(
                        "full_name",
                        "The client's name is missing"
                    );
                });
            });
        });
    });
});

describe("DELETE /clients/:id", () => {
    beforeEach(() => {
        cy.exec("npm run resetdb");
    });

    it("should delete a client.", () => {
        var login_info = {
            username: "blpsr",
            password: "thePassword",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            let request = {
                method: "GET",
                url: "api/clients",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                let clients = response.body;

                let newRequest = {
                    method: "DELETE",
                    url: `api/clients/${clients[0]._id}`,
                    headers: {
                        authorization: auth,
                    }
                };
    
                cy.request(newRequest).then((response) => {
                    expect(response.body.label).to.equal(clients[0].label);

                    let request = {
                        method: "GET",
                        url: "api/clients",
                        headers: {
                            authorization: auth,
                        },
                    };
                    cy.request(request).its("body.length").should("equal", 0);
                });
            });
        });
    });

    it("should not delete a client with if not logged in.", () => {
        var login_info = {
            username: "blpsr",
            password: "thePassword",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            var request = {
                method: "GET",
                url: "api/clients",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                let clients = response.body;

                let newRequest = {
                    method: "DELETE",
                    url: `api/clients/${clients[0]._id}`,
                    failOnStatusCode: false,
                };
        
                cy.request(newRequest).its("status").should("equal", 401);
            });
        });
    });

    it("should not delete a client with incorrect ID.", () => {
        var login_info = {
            username: "blpsr",
            password: "thePassword",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            var request = {
                method: "GET",
                url: "api/clients",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                let clients = response.body;

                let newRequest = {
                    method: "DELETE",
                    url: `api/clients/${clients[0]._id}ssss1`,
                    failOnStatusCode: false,
                    headers: {
                        authorization: auth,
                    },
                };
        
                cy.request(newRequest).then((response) => {
                    expect(response.status).to.equal(400);
                    expect(response.body).to.have.property(
                        "client",
                        "There was no client found"
                    );
                });
            });
        });
    });
});