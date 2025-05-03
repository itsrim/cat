import { Suspense } from "react";

import { StyledEngineProvider } from "@mui/material";
import localforage from "localforage";
import { SnackbarProvider } from "notistack";

const mountWithProviders = (cmp: React.ReactNode) => {
  cy.stub(localforage, "getItem").callsFake(
    () => new Promise((resolve) => resolve(null))
  );

  cy.stub(localforage, "setItem").callsFake(
    () => new Promise((resolve) => resolve(null))
  );

  cy.mount(
    <StyledEngineProvider injectFirst>
      <SnackbarProvider>
        <Suspense>{cmp}</Suspense>
      </SnackbarProvider>
    </StyledEngineProvider>
  );
};

export default mountWithProviders;
