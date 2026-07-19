"use client";

interface Props {
  game: string;
  total: number;
}


function getGameImage(game: string) {
  const name = game.toLowerCase().trim();


  // PUBG
  if (name.includes("pubg")) {
    return "/images/pubg.jpg";
  }


  // Free Fire
  if (
    name.includes("free") ||
    name.includes("fire") ||
    name === "ff"
  ) {
    return "/images/freefire.jpg";
  }


  // Roblox
  if (name.includes("roblox")) {
    return "/images/roblox.jpg";
  }


  // Mobile Legends
  if (
    name.includes("legend") ||
    name.includes("mlbb")
  ) {
    return "/images/mlbb.jpg";
  }


  return "/images/default-game.jpg";
}



export default function BestGameCard({
  game,
  total,
}: Props) {

  return (
    <div className="
      rounded-2xl
      bg-slate-900
      border
      border-cyan-500
      p-8
    ">

      <div className="
        flex
        items-center
        justify-between
        gap-5
      ">

        <div>

          <p className="text-gray-400">
            🏆 Best Selling Game
          </p>


          <h2 className="
            mt-2
            text-3xl
            font-black
            text-cyan-400
          ">
            {game}
          </h2>


          <p className="
            mt-2
            text-gray-500
          ">
            {total} Orders
          </p>

        </div>


        <img
          src={getGameImage(game)}
          alt={game}
          className="
            w-20
            h-20
            rounded-xl
            object-cover
          "
        />

      </div>

    </div>
  );
}