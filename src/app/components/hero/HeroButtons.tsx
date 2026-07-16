interface Props {
  onTopUp: () => void;
}

export default function HeroButtons({
  onTopUp,
}: Props) {
  return (
    <div className="mt-10 flex w-full max-w-md flex-col gap-4">

      {/* Top Up */}

      <button
        onClick={onTopUp}
        className="
        w-full
        rounded-2xl
        bg-gradient-to-r
        from-cyan-400
        to-cyan-500
        py-4
        text-xl
        font-bold
        text-black
        shadow-lg
        shadow-cyan-500/30
        transition-all
        duration-300
        hover:scale-105
        hover:shadow-cyan-400/60
        "
      >
        ⚡ Top Up Now
      </button>

      {/* View Games */}

      <button
        onClick={onTopUp}
        className="
        w-full
        rounded-2xl
        border-2
        border-cyan-500
        bg-slate-900/40
        backdrop-blur
        py-4
        text-xl
        font-bold
        text-cyan-300
        transition-all
        duration-300
        hover:bg-cyan-500
        hover:text-black
        hover:scale-105
        "
      >
        🎮 View Games
      </button>

    </div>
  );
}