"use client";

import Link from "next/link";
import { useMemo } from "react";

import useOrders from "../../hooks/useOrders";
import useFilters from "../../hooks/useFilters";
import useAnalytics from "../../hooks/useAnalytics";
import useRealtime from "@/hooks/useRealtime";

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
  // ==========================
  // Orders
  // ==========================

  const {
    audioRef,
    orders,
    selectedOrder,
    setSelectedOrder,
    fetchOrders,
    updateStatus,
    deleteOrder,
  } = useOrders();

  useRealtime(fetchOrders);

  // ==========================
  // Filters
  // ==========================

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

  // ==========================
  // Analytics
  // ==========================

  const {
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

  // ==========================
  // Memo
  // ==========================

  const hasOrders = useMemo(
    () => filteredOrders.length > 0,
    [filteredOrders]
  );

  // ==========================
  // Loading
  // ==========================

  if (!mounted) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#070b1d] text-white">
        <div className="text-center">
          <div className="mx-auto mb-5 h-14 w-14 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" />

          <h2 className="text-2xl font-bold">
            Loading Dashboard...
          </h2>

          <p className="mt-2 text-slate-400">
            Please wait a moment.
          </p>
        </div>
      </main>
    );
  }

  return (
    <>
      <audio
        ref={audioRef}
        src="/sounds/notification.mp3"
        preload="auto"
      />

      {/* ===== Continue in Part 2 ===== */}


            <main className="min-h-screen bg-[#070b1d] text-white">

        {/* Background Glow */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute left-0 top-0 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[120px]" />
          <div className="absolute bottom-0 right-0 h-[380px] w-[380px] rounded-full bg-sky-500/10 blur-[120px]" />
        </div>

        <div className="mx-auto max-w-[1700px] p-8">

          {/* Header */}
          <DashboardHeader
            currentTime={currentTime}
            mounted={mounted}
          />

          {/* Analytics */}
          <AnalyticsCards
            totalOrders={totalOrders}
            pendingOrders={pendingOrders}
            completedOrders={completedOrders}
            totalRevenue={totalRevenue}
            todayRevenue={todayRevenue}
            monthlyRevenue={monthlyRevenue}
          />

          {/* Search */}
          <div className="mt-10">
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
          </div>

          {/* Result */}
          <div className="mt-6 flex items-center justify-between">

            <p className="text-lg font-semibold text-cyan-400">
              Total Results : {filteredOrders.length}
            </p>

            <Link
              href="/admin/analytics"
              className="
                rounded-xl
                border
                border-cyan-500/30
                bg-cyan-500/10
                px-5
                py-3
                text-cyan-300
                transition
                hover:bg-cyan-500/20
              "
            >
              📊 Analytics
            </Link>

          </div>

          {/* Summary Cards */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">

            <BestGameCard
              game={String(bestSellingGame[0])}
              total={Number(bestSellingGame[1])}
            />

            <PaymentCard
              payment={String(mostUsedPayment[0])}
              total={Number(mostUsedPayment[1])}
              percentage={paymentPercentage}
            />

            <TopCustomerCard
              customer={String(topCustomer[0])}
              total={Number(topCustomer[1])}
            />

          </div>

          {/* Charts */}
          <div className="mt-10">
            <ChartsSection
              orders={filteredOrders}
              topCustomer={topCustomer}
            />
          </div>

          {/* Orders */}
          <div className="mt-10">

            {hasOrders ? (
              <OrdersTable
                orders={filteredOrders}
                onView={setSelectedOrder}
                onConfirm={updateStatus}
                onDelete={deleteOrder}
              />
            ) : (
              <div className="rounded-3xl border border-slate-700 bg-slate-900 p-16 text-center">

                <h2 className="text-3xl font-bold text-white">
                  No Orders Found
                </h2>

                <p className="mt-3 text-slate-400">
                  Try changing your search or filters.
                </p>

              </div>
            )}

          </div>

          {/* Modal */}
          <OrderModal
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
            onConfirm={updateStatus}
            onDelete={deleteOrder}
            onZoom={() => {}}
          />

        </div>

      </main>
    </>
  );
}