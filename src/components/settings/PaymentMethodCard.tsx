"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import { PaymentMethod } from "@/hooks/usePaymentMethods";
import { updatePaymentMethod } from "@/services/paymentMethods";

import LogoUploader from "./LogoUploader";
import QRUploader from "./QRUploader";
import AccountForm from "./AccountForm";
import SaveButton from "./SaveButton";

interface Props {
  method: PaymentMethod;
}

export default function PaymentMethodCard({
  method,
}: Props) {
  const [accountName, setAccountName] = useState(
    method.accountName
  );

  const [accountNumber, setAccountNumber] = useState(
    method.accountNumber
  );

  const [enabled, setEnabled] = useState(
    method.enabled
  );

  const [logoFile, setLogoFile] =
    useState<File | null>(null);

  const [qrFile, setQrFile] =
    useState<File | null>(null);

  const [logoPreview, setLogoPreview] =
    useState(method.logo);

  const [qrPreview, setQrPreview] =
    useState(method.qr);

  const [loading, setLoading] =
    useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);

      const form = new FormData();

      form.append("accountName", accountName);
      form.append("accountNumber", accountNumber);
      form.append("enabled", String(enabled));

      if (logoFile) {
        form.append("logo", logoFile);
      }

      if (qrFile) {
        form.append("qr", qrFile);
      }

      const data = await updatePaymentMethod(
        method._id,
        form
      );

      if (data.success) {
        toast.success("Saved successfully");

        if (data.method.logo) {
          setLogoPreview(data.method.logo);
        }

        if (data.method.qr) {
          setQrPreview(data.method.qr);
        }
      } else {
        toast.error("Update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">

      <h2 className="mb-6 text-2xl font-bold text-cyan-400">
        {method.name}
      </h2>

      <div className="grid gap-8 lg:grid-cols-2">

        <LogoUploader
          preview={logoPreview}
          onSelect={(file) => {
            setLogoFile(file);
            setLogoPreview(
              URL.createObjectURL(file)
            );
          }}
        />

        <QRUploader
          preview={qrPreview}
          onSelect={(file) => {
            setQrFile(file);
            setQrPreview(
              URL.createObjectURL(file)
            );
          }}
        />

      </div>

      <div className="mt-8">

        <AccountForm
          accountName={accountName}
          accountNumber={accountNumber}
          enabled={enabled}
          onAccountNameChange={setAccountName}
          onAccountNumberChange={setAccountNumber}
          onEnabledChange={setEnabled}
        />

      </div>

      <div className="mt-8">

        <SaveButton
          loading={loading}
          onClick={handleSave}
        />

      </div>

    </div>
  );
}