"use client";

interface FormData {
  gameId: string;
  playerName: string;
  serverId: string;
  phone: string;
}

interface Props {
  formData: FormData;
  setFormData: React.Dispatch<
    React.SetStateAction<FormData>
  >;
}

export default function PlayerForm({
  formData,
  setFormData,
}: Props) {
  return (
    <>
      {/* Game ID */}
      <div className="mb-5">
        <label className="block mb-2 font-semibold">
          Game ID
        </label>

        <input
          type="text"
          placeholder="Enter Game ID"
          value={formData.gameId}
          onChange={(e) =>
            setFormData({
              ...formData,
              gameId: e.target.value,
            })
          }
          className="w-full rounded-lg bg-slate-800 p-3"
        />
      </div>

      {/* Player */}
      <div className="mb-5">
        <label className="block mb-2 font-semibold">
          Player Name
        </label>

        <input
          type="text"
          placeholder="Player Name"
          value={formData.playerName}
          onChange={(e) =>
            setFormData({
              ...formData,
              playerName: e.target.value,
            })
          }
          className="w-full rounded-lg bg-slate-800 p-3"
        />
      </div>

      {/* Server */}
      <div className="mb-5">
        <label className="block mb-2 font-semibold">
          Server ID
        </label>

        <input
          type="text"
          placeholder="Server ID"
          value={formData.serverId}
          onChange={(e) =>
            setFormData({
              ...formData,
              serverId: e.target.value,
            })
          }
          className="w-full rounded-lg bg-slate-800 p-3"
        />
      </div>

      {/* Phone */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold">
          Phone Number
        </label>

        <input
          type="tel"
          inputMode="numeric"
          placeholder="012345678"
          value={formData.phone}
          onChange={(e) =>
            setFormData({
              ...formData,
              phone: e.target.value.replace(/\D/g, ""),
            })
          }
          className="w-full rounded-lg bg-slate-800 p-3"
        />
      </div>
    </>
  );
}