"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import useOrders from "./hooks/useOrders";
import useFilters from "./hooks/useFilters";
import useAnalytics from "./hooks/useAnalytics";

import DashboardHeader from "./components/DashboardHeader";
import AnalyticsCards from "./components/AnalyticsCards";
import SearchFilter from "./components/SearchFilter";
import BestGameCard from "./components/BestGameCard";
import PaymentCard from "./components/PaymentCard";
import TopCustomerCard from "./components/TopCustomerCard";
import ChartsSection from "./components/ChartsSection";
import OrdersTable from "./components/OrdersTable";
import OrderModal from "./components/OrderModal";

export default function AdminPage() {
  const router = useRouter();

  const {
    audioRef,
    orders,
    selectedOrder,
    setSelectedOrder,
    fetchOrders,
    updateStatus,
    deleteOrder,
  } = useOrders();

  const {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    filteredOrders,
  } = useFilters(orders);

  const {
    greeting,
    currentTime,
    mounted,
    totalOrders,
    pendingOrders,
    completedOrders,
    totalRevenue,
    todayRevenue,
    monthlyRevenue,
    bestSellingGame,
    mostUsedPayment,
    paymentPercentage,
    topCustomer,
    exportExcel,
  } = useAnalytics(filteredOrders);

  useEffect(() => {
  fetchOrders();

  const interval = setInterval(fetchOrders, 5000);

  return () => clearInterval(interval);
}, []);

  return (
    <>
      <audio
        ref={audioRef}
        src="/sounds/notification.mp3"
        preload="auto"
      />

      <main className="min-h-screen bg-[#070b1d] text-white p-8">

        <DashboardHeader
          greeting={greeting}
          currentTime={currentTime}
          mounted={mounted}
          pendingOrders={pendingOrders}
          onLogout={async () => {
  await fetch("/api/admin-logout", {
    method: "POST",
  });

  router.push("/admin/login");
  router.refresh();
}}
        />

        <AnalyticsCards
          totalOrders={totalOrders}
          pendingOrders={pendingOrders}
          completedOrders={completedOrders}
          totalRevenue={totalRevenue}
          todayRevenue={todayRevenue}
          monthlyRevenue={monthlyRevenue}
        />

        <SearchFilter
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          exportExcel={exportExcel}
        />

        <p className="text-cyan-400 font-bold mb-6">
          Total Results : {filteredOrders.length}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">

          <BestGameCard
            game={bestSellingGame[0]}
            total={Number(bestSellingGame[1])}
          />

          <PaymentCard
            payment={mostUsedPayment[0]}
            total={Number(mostUsedPayment[1])}
            percentage={paymentPercentage}
          />

          <TopCustomerCard
            customer={topCustomer[0]}
            total={Number(topCustomer[1])}
          />

        </div>

        <ChartsSection
          orders={filteredOrders}
          topCustomer={topCustomer}
        />

        <OrdersTable
          orders={filteredOrders}
          onView={setSelectedOrder}
          onConfirm={updateStatus}
          onDelete={deleteOrder}
        />

        <OrderModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onConfirm={updateStatus}
          onDelete={deleteOrder}
          onZoom={() => {}}
        />

      </main>
    </>
  );
}