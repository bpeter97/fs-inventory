describe("GET /notes", () => {
    beforeEach(() => {
        cy.exec("npm run resetdb");
    });

    it("should return all notes registered.", () => {
        var login_info = {
            username: "blpsr",
            password: "Victory2021!",
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
            failOnStatusCode: false,
        };

        cy.request(request).its("status").should("equal", 401);
    });

    it("should create a new note and return the newly created note.", () => {
        var login_info = {
            username: "blpsr",
            password: "Victory2021!",
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
                .its("body.note")
                .should("equal", newNote.note);
        });
    });

    it("should not create a new note if missing data.", () => {
        var login_info = {
            username: "blpsr",
            password: "Victory2021!",
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
                body: newNote,
                failOnStatusCode: false,
            };

            cy.request(request).then((response) => {
                expect(response.status).to.equal(400);
                expect(response.body).to.have.property(
                    "note",
                    "The note field is empty"
                );
            
            });
        });
    });
});

describe("GET /notes/:id", () => {
    beforeEach(() => {
        cy.exec("npm run resetdb");
    });

    it("should retrieve a note within the database if logged in.", () => {
        var login_info = {
            username: "blpsr",
            password: "Victory2021!",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            var request = {
                method: "GET",
                url: "api/notes",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                expect(response.body.length).to.equal(2);

                let notes = response.body;

                let newRequest = {
                    method: "GET",
                    url: `api/notes/${notes[0]._id}`,
                    headers: {
                        authorization: auth,
                    }
                }

                cy.request(newRequest)
                    .its("body.note")
                    .should("equal", notes[0].note);
            });
        });
    });

    it("should not retrieve a note with an incorrect ID.", () => {
        var login_info = {
            username: "blpsr",
            password: "Victory2021!",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            var request = {
                method: "GET",
                url: "api/notes",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                expect(response.body.length).to.equal(2);

                let notes = response.body;

                let newRequest = {
                    method: "GET",
                    url: `api/notes/${notes[0]._id}sss1`,
                    headers: {
                        authorization: auth,
                    },
                    failOnStatusCode: false,
                }

                cy.request(newRequest).then((response) => {
                    expect(response.status).to.equal(400);
                    expect(response.body).to.have.property(
                        "note",
                        "There was no note found"
                    );
                });
            });
        });
    });

    it("should not retrieve a note within the database if not logged in.", () => {

        var login_info = {
            username: "blpsr",
            password: "Victory2021!",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            var request = {
                method: "GET",
                url: "api/notes",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                expect(response.body.length).to.equal(2);

                let notes = response.body;

                let newRequest = {
                    method: "GET",
                    url: `api/notes/${notes[0]._id}`,
                    failOnStatusCode: false,
                };
        
                cy.request(newRequest).its("status").should("equal", 401);
            });
        });
    });
});

describe("PATCH /notes/:id", () => {
    beforeEach(() => {
        cy.exec("npm run resetdb");
    });

    it("should update a note that is already within the database.", () => {
        var login_info = {
            username: "blpsr",
            password: "Victory2021!",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            let request = {
                method: "GET",
                url: "api/notes",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                let notes = response.body;

                var updateNote = {
                    _id: notes[0]._id,
                    note: "The updated note."
                }

                let newRequest = {
                    method: "PATCH",
                    url: `api/notes/${updateNote._id}`,
                    headers: {
                        authorization: auth,
                    },
                    body: updateNote
                };
    
                cy.request(newRequest)
                    .its("body.note")
                    .should("equal", updateNote.note);
            });
        });
    });

    it("should not update a note if not logged in.", () => {
        var login_info = {
            username: "blpsr",
            password: "Victory2021!",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            var request = {
                method: "GET",
                url: "api/notes",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                let notes = response.body;

                let newRequest = {
                    method: "PATCH",
                    url: `api/notes/${notes[0]._id}`,
                    failOnStatusCode: false,
                };
        
                cy.request(newRequest).its("status").should("equal", 401);
            });
        });
    });

    it("should not update a note if missing data.", () => {
        var login_info = {
            username: "blpsr",
            password: "Victory2021!",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            let request = {
                method: "GET",
                url: "api/notes",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                let notes = response.body;

                var updateNote = {
                    _id: notes[0]._id,
                    note: null
                }

                let newRequest = {
                    method: "PATCH",
                    url: `api/notes/${updateNote._id}`,
                    headers: {
                        authorization: auth,
                    },
                    body: updateNote,
                    failOnStatusCode: false,
                };
        
                cy.request(newRequest).then((response) => {
                    expect(response.status).to.equal(400);
                    expect(response.body).to.have.property(
                        "note",
                        "The note field is empty"
                    );
                });
            });
        });
    });
});

describe("DELETE /notes/:id", () => {
    beforeEach(() => {
        cy.exec("npm run resetdb");
    });

    it("should delete a note that is already within the database.", () => {
        var login_info = {
            username: "blpsr",
            password: "Victory2021!",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            let request = {
                method: "GET",
                url: "api/notes",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                let notes = response.body;

                let newRequest = {
                    method: "DELETE",
                    url: `api/notes/${notes[0]._id}`,
                    headers: {
                        authorization: auth,
                    }
                };
    
                cy.request(newRequest).then((response) => {
                    expect(response.body.note).to.equal(notes[0].note);

                    let request = {
                        method: "GET",
                        url: "api/notes",
                        headers: {
                            authorization: auth,
                        },
                    };
                    cy.request(request).its("body.length").should("equal", 1);
                });
            });
        });
    });

    it("should not delete a note if not logged in.", () => {
        var login_info = {
            username: "blpsr",
            password: "Victory2021!",
        };

        cy.request("POST", "api/login", login_info).then((response) => {
            expect(response.body).to.have.property("success", true);

            var auth = response.body.token;

            var request = {
                method: "GET",
                url: "api/notes",
                headers: {
                    authorization: auth,
                },
            };

            cy.request(request).then((response) => {
                let notes = response.body;

                let newRequest = {
                    method: "DELETE",
                    url: `api/notes/${notes[0]._id}`,
                    failOnStatusCode: false,
                };
        
                cy.request(newRequest).its("status").should("equal", 401);
            });
        });
    });
});
