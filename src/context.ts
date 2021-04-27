import React from "react";

import { RegionsStore } from "store";

export const storesContext = React.createContext({
    regionsStore: new RegionsStore(),
});
