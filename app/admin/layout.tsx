import { ReactNode } from "react";
import AdminLayout from "@/components/admin/Layout";

interface Props {
  children: ReactNode;
}

export default function Layout({
  children,
}: Props) {
  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
}