// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import { mount } from 'cypress/react';

import './commands/commands-cmp';
import findByAriaLabel from './commands/utils/findByAriaLabel';
import findByDataRole from './commands/utils/findByDataRole';
import interceptApiRoutes from './commands/utils/interceptApiRoutes';
import mountWithProviders from './commands/utils/mountWithProviders';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      findByAriaLabel: typeof findByAriaLabel;
      findByDataRole: typeof findByDataRole;
      mountWithProviders: typeof mountWithProviders;
      interceptApiRoutes: typeof interceptApiRoutes;
    }
  }
}

Cypress.Commands.add('mount', mount);

Cypress.Commands.add(
  'findByAriaLabel',
  {
    prevSubject: true
  },
  (subject: Cypress.Chainable, label: string) => findByAriaLabel(label, subject)
);

Cypress.Commands.add(
  'findByDataRole',
  {
    prevSubject: true
  },
  (subject: Cypress.Chainable, label: string) => findByDataRole(label, subject)
);

Cypress.Commands.add(
  'mountWithProviders',
  {
    prevSubject: false
  },
  mountWithProviders
);

Cypress.Commands.add(
  'interceptApiRoutes',
  {
    prevSubject: false
  },
  interceptApiRoutes
);
