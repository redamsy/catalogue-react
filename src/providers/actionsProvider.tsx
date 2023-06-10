import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { AxiosResponse } from "axios";
import { IProductBody, Product } from "../models/Product";
import {
  createProduct,
  deleteCurrentUserProduct,
  getCurrentUserProducts,
  updateCurrentUserProduct,
} from "../actions/product";

export interface IAppActions {
  createProduct: (conferenceGallery: IProductBody) => Promise<AxiosResponse<Product>>;
  updateCurrentUserProduct: (product: IProductBody) => Promise<AxiosResponse<Product>>;
  getCurrentUserProducts: () => Promise<AxiosResponse<Product[]>>;
  deleteCurrentUserProduct: (productId: string) => Promise<AxiosResponse<Product>>;
}

export const AppActionsContext = createContext<IAppActions | undefined>(
  undefined
);
export const useAppActions = () => useContext(AppActionsContext);

export const AppActionsProvider = ({ children }: { children: ReactNode }) => {
  const [appActions, setAppActions] = useState<IAppActions>();

  function configureAppActions(): IAppActions {
    return {
      createProduct,
      updateCurrentUserProduct,
      getCurrentUserProducts,
      deleteCurrentUserProduct,
    };
  }

  useEffect(() => {
    const actions = configureAppActions();
    console.log("actionsProvider: actions", actions);
    setAppActions(actions);
  }, []);

  return (
    <AppActionsContext.Provider value={appActions}>
      {children}
    </AppActionsContext.Provider>
  );
};
