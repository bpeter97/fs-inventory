describe("GET /status", () => {
    beforeEach(() => {
        cy.exec("npm run resetdb");
    });

    it("should return all status registered.", () => {
        var login_info = {
            username: "blpsr",
            password: "Victory2021!",
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
            password: "Victory2021!",
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
            password: "Victory2021!",
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
            password: "Victory2021!",
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
            password: "Victory2021!",
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
            password: "Victory2021!",
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
            password: "Victory2021!",
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
                        "There was no status found"
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

    it("should update a status.", () => {
        var login_info = {
            username: "blpsr",
            password: "Victory2021!",
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
                
                let updateStatus = {
                    _id: status[0]._id,
                    label: "Updated Label",
                    initials: "UL"
                };

                let newRequest = {
                    method: "PATCH",
                    url: `api/status/${status[0]._id}`,
                    headers: {
                        authorization: auth,
                    },
                    body: updateStatus
                };

                cy.request(newRequest)
                    .its("body.label")
                    .should("equal", updateStatus.label);
            });
        });
    });

    it("should not update a status with incorrect ID.", () => {
        var login_info = {
            username: "blpsr",
            password: "Victory2021!",
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
                
                let updateStatus = {
                    _id: status[0]._id,
                    label: "Updated Label",
                    initials: "UL"
                };

                let newRequest = {
                    method: "PATCH",
                    url: `api/status/${status[0]._id}sss1`,
                    headers: {
                        authorization: auth,
                    },
                    body: updateStatus,
                    failOnStatusCode: false,
                }

                cy.request(newRequest).then((response) => {
                    expect(response.status).to.equal(400);
                    expect(response.body).to.have.property(
                        "status",
                        "There was no status found"
                    );
                });
            });
        });
    });

    it("should not update a status with incorrect fields.", () => {
        var login_info = {
            username: "blpsr",
            password: "Victory2021!",
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
                
                let updateStatus = {
                    _id: status[0]._id,
                    label: null,
                    initials: "UL"
                };

                let newRequest = {
                    method: "PATCH",
                    url: `api/status/${status[0]._id}`,
                    headers: {
                        authorization: auth,
                    },
                    body: updateStatus,
                    failOnStatusCode: false,
                }

                cy.request(newRequest).then((response) => {
                    expect(response.status).to.equal(400);
                    expect(response.body).to.have.property(
                        "label",
                        "The label field is empty"
                    );
                });
            });
        });
    });

    it("should not update a status to one that has a label that already exists.", () => {
        var login_info = {
            username: "blpsr",
            password: "Victory2021!",
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
                
                let updateStatus = {
                    _id: status[0]._id,
                    label: "Inspected",
                    initials: "UL"
                };

                let newRequest = {
                    method: "PATCH",
                    url: `api/status/${status[0]._id}`,
                    headers: {
                        authorization: auth,
                    },
                    body: updateStatus,
                    failOnStatusCode: false,
                }

                cy.request(newRequest).then((response) => {
                    expect(response.status).to.equal(400);
                    expect(response.body).to.have.property(
                        "label",
                        "A status with that label already exists"
                    );
                });
            });
        });
    });

    it("should not update a status to one that has initials that already exists.", () => {
        var login_info = {
            username: "blpsr",
            password: "Victory2021!",
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
                
                let updateStatus = {
                    _id: status[0]._id,
                    label: "Inspecteddddddddd",
                    initials: "IN"
                };

                let newRequest = {
                    method: "PATCH",
                    url: `api/status/${status[0]._id}`,
                    headers: {
                        authorization: auth,
                    },
                    body: updateStatus,
                    failOnStatusCode: false,
                }

                cy.request(newRequest).then((response) => {
                    expect(response.status).to.equal(400);
                    expect(response.body).to.have.property(
                        "initials",
                        "A status with the initials already exists"
                    );
                });
            });
        });
    });
});

describe("DELETE /status/:id", () => {
    beforeEach(() => {
        cy.exec("npm run resetdb");
    });

    it("should delete a status.", () => {
        var login_info = {
            username: "blpsr",
            password: "Victory2021!",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            let request = {
                method: "GET",
                url: "api/status",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                let status = response.body;

                let newRequest = {
                    method: "DELETE",
                    url: `api/status/${status[0]._id}`,
                    headers: {
                        authorization: auth,
                    }
                };
    
                cy.request(newRequest).then((response) => {
                    expect(response.body.label).to.equal(status[0].label);

                    let request = {
                        method: "GET",
                        url: "api/status",
                        headers: {
                            authorization: auth,
                        },
                    };
                    cy.request(request).its("body.length").should("equal", 3);
                });
            });
        });
    });

    it("should not delete a status with if not logged in.", () => {
        var login_info = {
            username: "blpsr",
            password: "Victory2021!",
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
                let status = response.body;

                let newRequest = {
                    method: "DELETE",
                    url: `api/status/${status[0]._id}`,
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
                url: "api/status",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                let status = response.body;

                let newRequest = {
                    method: "DELETE",
                    url: `api/status/${status[0]._id}ssss1`,
                    failOnStatusCode: false,
                    headers: {
                        authorization: auth,
                    },
                };
        
                cy.request(newRequest).then((response) => {
                    expect(response.status).to.equal(400);
                    expect(response.body).to.have.property(
                        "status",
                        "There was no status found"
                    );
                });
            });
        });
    });
});