import { mount } from "@cypress/react18";

// Make `mount` available globally in every test
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add("mount", mount);
