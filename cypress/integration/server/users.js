var newUser = require("../../fixtures/newUser.json");

describe("GET /users", () => {
  beforeEach(() => {
    cy.exec("npm run resetdb");
  });

  it("should return all users registered in the management system.", () => {
    var login_info = {
      username: "blpsr",
      password: "Victory2021!",
    };

    cy.request("POST", "api/login", login_info).then((response) => {
      expect(response.body).to.have.property("success", true);

      var request = {
        method: "GET",
        url: "api/users",
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

  it("should not return all users registered if not logged in.", () => {
    var request = {
      method: "GET",
      url: "api/users",
      failOnStatusCode: false,
    };

    cy.request(request).its("status").should("equal", 401);
  });
});

describe("DELETE /users/:id", () => {
  beforeEach(() => {
    cy.exec("npm run resetdb");
  });

  it("should delete the user with the provided ID.", () => {
    var login_info = {
      username: "blpsr",
      password: "Victory2021!",
    };

    cy.request("POST", "api/login", login_info).then((login) => {
      expect(login.body).to.have.property("success", true);

      var request = {
        method: "GET",
        url: "api/users",
        headers: {
          authorization: login.body.token,
        },
      };

      cy.request(request).then((users) => {
        var request = {
          method: "DELETE",
          url: `api/users/${users.body[0]._id}`,
          headers: {
            authorization: login.body.token,
          },
        };

        cy.request(request).then((res) => {
          expect(res.body).to.have.property("username", "blpsr");
        });
      });
    });
  });

  it("should not delete the user without being logged in.", () => {
    var login_info = {
      username: "blpsr",
      password: "Victory2021!",
    };

    cy.request("POST", "api/login", login_info).then((login) => {
      expect(login.body).to.have.property("success", true);

      var request = {
        method: "GET",
        url: "api/users",
        headers: {
          authorization: login.body.token,
        },
      };

      cy.request(request).then((users) => {
        // Delete the user with the ID, though, do not send auth token to simulate being logged out.
        var request = {
          method: "DELETE",
          url: `api/users/${users.body[0]._id}`,
          failOnStatusCode: false,
        };

        cy.request(request).its("status").should("equal", 401);
      });
    });
  });
});

describe("GET /users/:id", () => {
  beforeEach(() => {
    cy.exec("npm run resetdb");
  });

  it("should retrieve a specific user with the provided ID.", () => {
    var login_info = {
      username: "blpsr",
      password: "Victory2021!",
    };

    cy.request("POST", "api/login", login_info).then((login) => {
      expect(login.body).to.have.property("success", true);

      var request = {
        method: "GET",
        url: "api/users",
        headers: {
          authorization: login.body.token,
        },
      };

      cy.request(request).then((users) => {
        var request = {
          method: "GET",
          url: `api/users/${users.body[0]._id}`,
          headers: {
            authorization: login.body.token,
          },
        };

        cy.request(request).then((res) => {
          expect(res.body).to.have.property("username", "blpsr");
          expect(res.body).to.have.property("first_name", "Brian");
        });
      });
    });
  });

  it("should not retrieve a specific user without being logged in.", () => {
    var login_info = {
      username: "blpsr",
      password: "Victory2021!",
    };

    cy.request("POST", "api/login", login_info).then((login) => {
      expect(login.body).to.have.property("success", true);

      var request = {
        method: "GET",
        url: "api/users",
        headers: {
          authorization: login.body.token,
        },
      };

      // Delete the user with the ID, though, do not send auth token to simulate being logged out.
      cy.request(request).then((users) => {
        var request = {
          method: "GET",
          url: `api/users/${users.body[0]._id}`,
          failOnStatusCode: false,
        };

        cy.request(request).its("status").should("equal", 401);
      });
    });
  });
});

describe("PATCH /users/:id", () => {
  beforeEach(() => {
    cy.exec("npm run resetdb");
  });

  it("should update a specific user with the provided ID.", () => {
    var login_info = {
      username: "blpsr",
      password: "Victory2021!",
    };

    // Login
    cy.request("POST", "api/login", login_info).then((login) => {
      expect(login.body).to.have.property("success", true);

      var request = {
        method: "GET",
        url: "api/users",
        headers: {
          authorization: login.body.token,
        },
      };

      // Get a user's ID
      cy.request(request).then((users) => {
        let new_body = {
          username: "blpsr",
          password: "Victory2021!",
          first_name: "Brian - Patched",
          last_name: "Peter",
          suffix: "Sr",
          email: "dad@email.com",
          position: "Manager",
          type: "Admin",
          approved: "true",
        };

        // Create new request
        var request = {
          method: "PATCH",
          url: `api/users/${users.body[0]._id}`,
          headers: {
            authorization: login.body.token,
          },
          body: new_body,
        };

        // Request the patch
        cy.request(request).then((res) => {
          expect(res.body).to.have.property("username", "blpsr");
          expect(res.body).to.have.property("first_name", "Brian - Patched");
        });
      });
    });
  });

  it("should not update a user without being logged in.", () => {
    var login_info = {
      username: "blpsr",
      password: "Victory2021!",
    };

    // Login
    cy.request("POST", "api/login", login_info).then((login) => {
      expect(login.body).to.have.property("success", true);

      var request = {
        method: "GET",
        url: "api/users",
        headers: {
          authorization: login.body.token,
        },
      };

      // Get a user's ID
      cy.request(request).then((users) => {
        let new_body = {
          username: "blpsr",
          password: "Victory2021!",
          first_name: "Brian - Patched",
          last_name: "Peter",
          suffix: "Sr",
          email: "dad@email.com",
          position: "Manager",
          type: "Admin",
          approved: "true",
        };

        // Create new request without auth code to simulate not being logged in.
        var request = {
          method: "PATCH",
          url: `api/users/${users.body[0]._id}`,
          body: new_body,
          failOnStatusCode: false,
        };

        cy.request(request).its("status").should("equal", 401);
      });
    });
  });

  it("should not update with validation errors.", () => {
    var login_info = {
      username: "blpsr",
      password: "Victory2021!",
    };

    // Login
    cy.request("POST", "api/login", login_info).then((login) => {
      expect(login.body).to.have.property("success", true);

      var request = {
        method: "GET",
        url: "api/users",
        headers: {
          authorization: login.body.token,
        },
      };

      // Get a user's ID
      cy.request(request).then((users) => {
        let new_body = {
          username: "",
          password: "",
          first_name: "",
          last_name: "",
          suffix: "",
          email: "",
          position: "",
          type: "",
          approved: "",
        };

        // Create new request
        var request = {
          method: "PATCH",
          url: `api/users/${users.body[0]._id}`,
          headers: {
            authorization: login.body.token,
          },
          body: new_body,
          failOnStatusCode: false,
        };

        // Request the patch
        cy.request(request).then((res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property(
            "first_name",
            "First name is required"
          );
          expect(res.body).to.have.property(
            "last_name",
            "Last name is required"
          );
          expect(res.body).to.have.property("username", "Username is required");
          expect(res.body).to.have.property("password", "Password is required");
          expect(res.body).to.have.property("email", "Email is required");
          expect(res.body).to.have.property("position", "Position is required");
        });
      });
    });
  });
});

describe("POST /register", () => {
  var newUser = require("../../fixtures/newUser.json");

  var newErrorUser = {
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    suffix: "",
    email: "",
    position: "",
  };

  beforeEach(() => {
    cy.exec("npm run resetdb");
  });

  it("should create a new user and two users should be registered in the system.", () => {
    cy.request("POST", "api/register", newUser).then((response) => {
      expect(response.body).to.have.property("username", "blpj");
    });
    var login_info = {
      username: "blpsr",
      password: "Victory2021!",
    };

    cy.request("POST", "api/login", login_info).then((response) => {
      expect(response.body).to.have.property("success", true);

      var request = {
        method: "GET",
        url: "api/users",
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

  it("should not create a new user with empty inputs.", () => {
    let request = {
      method: "POST",
      url: "api/register",
      body: newErrorUser,
      failOnStatusCode: false,
    };

    cy.request(request).then((response) => {
      expect(response.status).to.equal(400);
      expect(response.body).to.have.property(
        "first_name",
        "First name is required"
      );
      expect(response.body).to.have.property(
        "last_name",
        "Last name is required"
      );
      expect(response.body).to.have.property(
        "username",
        "Username is required"
      );
      expect(response.body).to.have.property(
        "password",
        "Password is required"
      );
      expect(response.body).to.have.property("email", "Email is required");
      expect(response.body).to.have.property(
        "position",
        "Position is required"
      );
    });
  });

  it("should not create a new user with validation errors.", () => {
    let newInvalidUser = {
      first_name: "a",
      last_name: "123456789112345678921234567893",
      suffix: "123456",
      username: "a",
      password: "12",
      email: "notanemail",
      position: newErrorUser.position,
    };

    let request = {
      method: "POST",
      url: "api/register",
      body: newInvalidUser,
      failOnStatusCode: false,
    };

    cy.request(request).then((response) => {
      expect(response.status).to.equal(400);
      expect(response.body).to.have.property(
        "first_name",
        "First name must be between 2 and 20 characters"
      );
      expect(response.body).to.have.property(
        "last_name",
        "Last name must be between 2 and 20 characters"
      );
      expect(response.body).to.have.property(
        "suffix",
        "Suffix must be between 2 and 4"
      );
      expect(response.body).to.have.property(
        "username",
        "Username must be between 4 and 20 characters"
      );
      expect(response.body).to.have.property(
        "password",
        "Password must be more than 3 characters"
      );
      expect(response.body).to.have.property(
        "email",
        "Must enter a valid email"
      );
      expect(response.body).to.have.property(
        "position",
        "Position is required"
      );
    });
  });
});

describe("POST /login", () => {
  beforeEach(() => {
    cy.exec("npm run resetdb");
  });

  it("should return the success property if logs in successfully.", () => {
    var login_info = {
      username: "blpsr",
      password: "Victory2021!",
    };

    cy.request("POST", "api/login", login_info).then((response) => {
      expect(response.body).to.have.property("success", true);
    });
  });

  it("should not allow a non-approved user to log in.", () => {
    var login_info = {
      username: "blpj",
      password: "Victory2021!",
    };

    cy.request("POST", "api/register", newUser).then((response) => {
      let request = {
        method: "POST",
        url: "api/login",
        failOnStatusCode: false,
        body: login_info,
      };

      cy.request(request).then((res) => {
        expect(res.status).to.eq(401);
        expect(res.body).to.have.property(
          "login",
          "Your account is not approved yet."
        );
      });
    });
  });

  it("should not allow a user to log in with validation errors.", () => {
    var login_info = {
      username: "",
      password: "",
    };

    let request = {
      method: "POST",
      url: "api/login",
      failOnStatusCode: false,
      body: login_info,
    };

    cy.request(request).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property(
        "username",
        "Username is required."
      );
      expect(response.body).to.have.property(
        "password",
        "Password is required."
      );
    });
  });
});
