import React, { memo, useEffect, useState } from "react";

import { useAppActions } from "../providers/actionsProvider";
import { Product } from "../models/Product";
import ProductList from "./ProductList";
import moment from "moment";

export type ProductsGroupedByDay = {
  day: Date;
  products: Product[];
};

// eslint-disable-next-line react/display-name
const ProductListWrapper = memo(() => {
  const appActions = useAppActions();

  const [remainingProductsGroupedByDay, setRemainingProductsGroupedByDay] = useState<
    ProductsGroupedByDay[]
  >([]);
  const [finishedProductsGroupedByDay, setFinishedProductsGroupedByDay] = useState<
    ProductsGroupedByDay[]
  >([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  function getProductsGroupedByDay(products: Product[]): ProductsGroupedByDay[] {
    return products
      .reduce((acc: ProductsGroupedByDay[], product: Product) => {
        const newDate = new Date(product.date);
        const date = new Date(
          newDate.getFullYear(),
          newDate.getMonth(),
          newDate.getDate()
        );
        const foundIndex = acc.findIndex((d) => {
          return d.day.getTime() === date.getTime();
        });

        if (foundIndex === -1) {
          acc.push({
            day: date,
            products: [product],
          });
        } else {
          const dayDetails = acc[foundIndex];
          dayDetails.products.push(product);
        }
        return acc;
      }, [] as ProductsGroupedByDay[])
      .sort((a, b) => moment(a.day).unix() - moment(b.day).unix());
  }

  const getProducts = async () => {
    if (appActions) {
      setLoading(true);
      const res = await appActions.getCurrentUserProducts();
      const remaining = getProductsGroupedByDay(
        res.data.filter((product) => !product.completed)
      );
      const finsihed = getProductsGroupedByDay(
        res.data.filter((product) => product.completed)
      );
      setRemainingProductsGroupedByDay(remaining);
      setFinishedProductsGroupedByDay(finsihed);
      setProducts(res.data);
      setLoading(false);
    } else console.log("ProductListWrapper: appActions not initialized");
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ProductList
      products={products}
      remainingProductsGroupedByDay={remainingProductsGroupedByDay}
      finishedProductsGroupedByDay={finishedProductsGroupedByDay}
      loading={loading}
      getProducts={getProducts}
    />
  );
});

export default ProductListWrapper;
