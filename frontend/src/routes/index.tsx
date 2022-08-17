import { Router } from "express";
import React from "react";
import { Route, RouterProps, Routes } from "react-router-dom";

const ShimpentIndex = React.lazy(() => import("../pages/shipment_index"));
const ShipmentCreate = React.lazy(() => import("../pages/shipment_create"));

const commontRoutes = [
  {
    path: "/",
    key: "shipmentIndex",
    element: ShimpentIndex,
  },
  {
    path: "/create",
    key: "shipmentCreate",
    element: ShipmentCreate,
  },
];

export { commontRoutes };
