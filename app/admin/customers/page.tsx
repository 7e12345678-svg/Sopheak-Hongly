"use client";

import { useEffect, useState } from "react";
import CustomerTable from "@/components/customers/CustomerTable";
import CustomerStats from "@/components/customers/CustomerStats";
import CustomerDetailsModal from "@/components/customers/CustomerDetailsModal";

interface Customer {
  phone: string;
  playerName: string;
  totalOrders: number;
  totalSpent: number;
  favoriteGame: string;
  lastOrder: string;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [openDetails, setOpenDetails] = useState(false);
  const [selectedCustomer, setSelectedCustomer] =

  useState<Customer | null>(null);
  useEffect(() => {
    fetchCustomers();
  }, []);

  async function fetchCustomers() {
    try {
      const res = await fetch("/api/customers");
      const data = await res.json();

      if (data.success) {
        setCustomers(data.customers);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const filteredCustomers = customers.filter((customer) =>
  customer.playerName
    .toLowerCase()
    .includes(search.toLowerCase()) ||
  customer.phone.includes(search)
);

  return (
    <main className="min-h-screen bg-[#070b1d] text-white p-8">

      <div className="flex items-center justify-between mb-8">

        <div>
          <h1 className="text-4xl font-bold text-cyan-400">
            👥 Customer Management
          </h1>

          <p className="text-gray-400 mt-2">
            View all customers and their purchase history
          </p>
        </div>

      </div>

      <CustomerStats
  customers={customers}
/>

<div className="mb-6">
  <input
    type="text"
    placeholder="Search customer..."
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
    className="w-full bg-[#111827] border border-slate-700 rounded-xl px-5 py-3 outline-none"
  />
</div>

      {loading ? (
        <div className="bg-[#111827] rounded-2xl border border-slate-700 p-8 text-center">
          Loading customers...
        </div>
        
      ) : 
      
      (
        
       <CustomerTable
  customers={filteredCustomers}
  onView={(customer) => {
    setSelectedCustomer(customer);
    setOpenDetails(true);
  }}
/>
      )}

      <CustomerDetailsModal
  open={openDetails}
  customer={selectedCustomer}
  onClose={() => {
    setOpenDetails(false);
    setSelectedCustomer(null);
  }}
/>

    </main>
  );
}