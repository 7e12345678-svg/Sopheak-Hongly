"use client";

import { useState } from "react";
import { Order } from "./useOrders";

export default function useFilters(orders: Order[]) {
  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [startDate, setStartDate] =
    useState("");

  const [endDate, setEndDate] =
    useState("");

  const filteredOrders = orders.filter((order) => {
    const keyword = search.toLowerCase();

    const matchSearch =
      order.playerName
        .toLowerCase()
        .includes(keyword) ||
      order.gameId
        .toLowerCase()
        .includes(keyword);

    const matchStatus =
      statusFilter === "All" ||
      order.status === statusFilter;

    const orderDate = new Date(order.createdAt);

    const matchStart =
      !startDate ||
      orderDate >= new Date(startDate);

    const matchEnd =
      !endDate ||
      orderDate <= new Date(endDate);

    return (
      matchSearch &&
      matchStatus &&
      matchStart &&
      matchEnd
    );
  });

  return {
    search,
    setSearch,

    statusFilter,
    setStatusFilter,

    startDate,
    setStartDate,

    endDate,
    setEndDate,

    filteredOrders,
  };
}