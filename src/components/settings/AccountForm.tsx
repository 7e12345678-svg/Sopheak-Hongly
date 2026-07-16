"use client";

interface Props {
  accountName: string;
  accountNumber: string;
  enabled: boolean;

  onAccountNameChange: (value: string) => void;
  onAccountNumberChange: (value: string) => void;
  onEnabledChange: (value: boolean) => void;
}

export default function AccountForm({
  accountName,
  accountNumber,
  enabled,

  onAccountNameChange,
  onAccountNumberChange,
  onEnabledChange,
}: Props) {
  return (
    <div className="space-y-5">

      <div>
        <label className="mb-2 block text-sm text-slate-400">
          Account Name
        </label>

        <input
          value={accountName}
          onChange={(e) =>
            onAccountNameChange(e.target.value)
          }
          className="
            w-full
            rounded-xl
            border
            border-slate-700
            bg-slate-800
            p-3
            outline-none
            focus:border-cyan-500
          "
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-slate-400">
          Account Number
        </label>

        <input
          value={accountNumber}
          onChange={(e) =>
            onAccountNumberChange(e.target.value)
          }
          className="
            w-full
            rounded-xl
            border
            border-slate-700
            bg-slate-800
            p-3
            outline-none
            focus:border-cyan-500
          "
        />
      </div>

      <div
        className="
          flex
          items-center
          justify-between
          rounded-xl
          border
          border-slate-700
          bg-slate-800
          p-4
        "
      >
        <span className="font-medium">
          Enable Payment
        </span>

        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) =>
            onEnabledChange(e.target.checked)
          }
          className="h-5 w-5"
        />
      </div>

    </div>
  );
}