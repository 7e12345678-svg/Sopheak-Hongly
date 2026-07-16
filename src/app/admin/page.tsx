"use client";

import Link from "next/link";

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

  return (
    <>
      <audio
        ref={audioRef}
        src="/sounds/notification.mp3"
        preload="auto"
      />

      <main className="min-h-screen bg-[#070b1d] p-8 text-white">

        <DashboardHeader
          currentTime={currentTime}
          mounted={mounted}
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

        <p className="mb-6 font-bold text-cyan-400">
          Total Results : {filteredOrders.length}
        </p>

        <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-3">

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

        <Link
          href="/admin"
          className="
            fixed
            bottom-6
            right-6
            z-[9999]
            flex
            items-center
            gap-2
            rounded-full
            bg-cyan-500
            px-5
            py-3
            font-bold
            text-black
            shadow-lg
            shadow-cyan-500/40
            transition
            hover:scale-105
            hover:bg-cyan-400
          "
        >
          ⚙️ Admin
        </Link>

      </main>
    </>
  );
}