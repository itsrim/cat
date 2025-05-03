import modal from "cypress/support/components/modal";
import localforage from "localforage";

export const APP_URL = `${Cypress.env("protocole")}://${Cypress.env("host")}${
  Cypress.env("port") ? ":" + Cypress.env("port") : ""
}`;

export const PDF_JS_WORKER_PATH = "/pdfjs/pdf.worker.min.mjs";

const checkPageIsLoaded = (cy) => {
  cy.get(".pageContent", { timeout: 10000 }).should("exist");
};

export const openApp = (cy) => {
  cy.visit(APP_URL);
  checkPageIsLoaded(cy);
};

Cypress.Commands.add("deleteDownloadsFolder", () => {
  const downloadsFolder = Cypress.config("downloadsFolder");
  cy.task("deleteDownloadsFolder", downloadsFolder);
});

Cypress.Commands.add("parseXlsx", (inputFile) => {
  return cy.task("parseXlsx", { filePath: inputFile });
});

Cypress.Commands.add("readdir", (path) => {
  return cy.task("readdir", path);
});

Cypress.Commands.add("exportIndexedDB", () => {
  return new Cypress.Promise(async (resolve) => {
    const localForageContent = await localforage.getItem("persist:root");
    localStorage.setItem("savedForage", localForageContent);
    resolve();
  });
});

Cypress.Commands.add("importIndexedDB", () => {
  return new Cypress.Promise(async (resolve) => {
    const json = localStorage.getItem("savedForage");
    if (!json) {
      resolve();
      return;
    }
    await localforage.setItem("persist:root", json);
    resolve();
  });
});

const fillLoginForm = (email, password) => {
  cy.get("#mail").type(email);
  cy.get("#password").type(password);
  cy.get("form").then(($form) => {
    const $cguCheckbox = $form.find("input[type=checkbox][name=cgu]");
    const $allowDataCheckbox = $form.find(
      "input[type=checkbox][name=allowData]"
    );
    if ($cguCheckbox.length) {
      cy.wrap($cguCheckbox).check();
    }
    if ($allowDataCheckbox.length) {
      cy.wrap($allowDataCheckbox).check();
    }
  });
};

const handleAuthStatuses = (response) => {
  if (response.body.status === "firm-selection") {
    cy.getAutocomplete("group").type("_sch1{enter}");
    cy.contains("Valider").eq(0).click({ force: true });
  } else if (response.body.status === "require-cgu-approval") {
    modal.getAction("J’accepte").as("acceptButton");
    cy.get("@acceptButton").should("be.disabled");
    cy.get("#termsAndConditions").scrollTo("bottom");
    cy.get("@acceptButton").should("not.be.disabled");
    cy.get("@acceptButton").click();
  }
};

export const logMe = (cy) => {
  cy.session(
    "user",
    () => {
      cy.visit(APP_URL);
      window.indexedDB.deleteDatabase("localforage");
      cy.intercept("/?timestamp*").as("homeWithTimestamp");
      cy.wait("@homeWithTimestamp", { timeout: 15000 });
      cy.intercept("/app_info").as("appInfo");
      cy.wait("@appInfo", { timeout: 15000 });
      fillLoginForm(Cypress.env("email"), Cypress.env("password"));
      const uniqueId = Math.random();
      cy.intercept("GET", `${Cypress.env("wsUrl")}/dashboard/collab*`).as(
        "home_" + uniqueId
      );
      cy.intercept("/api/authenticate").as("authLog_" + uniqueId);
      cy.get("button").eq(0).click();
      cy.get("button").eq(2).click();
      cy.wait("@authLog_" + uniqueId).then(({ response }) =>
        handleAuthStatuses(response)
      );
      cy.wait("@home_" + uniqueId, { timeout: 15000 });
      // Cypress doesn't handle indexedDB storage in session feature
      // save it manually
      cy.exportIndexedDB();
    },
    {
      validate: () => {
        // Cypress doesn't handle indexedDB storage in session feature
        // restore it manually
        cy.importIndexedDB();
      },
    }
  );
};
