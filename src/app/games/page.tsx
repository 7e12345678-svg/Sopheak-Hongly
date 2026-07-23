// Replace your src/app/games/page.tsx with this starter.
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Flame, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface GamePackage { name:string; price:number; }
interface Game {
  _id:string;
  name:string;
  slug:string;
  image:string;
  description:string;
  packages:GamePackage[];
  featured:boolean;
  sortOrder:number;
  status:boolean;
}

export default function GamesPage(){
  const [games,setGames]=useState<Game[]>([]);
  const [loading,setLoading]=useState(true);
  const [search,setSearch]=useState("");

  useEffect(()=>{
    (async()=>{
      try{
        const res=await fetch("/api/games",{cache:"no-store"});
        const data=await res.json();
        if(data.success) setGames(data.games);
      }finally{
        setLoading(false);
      }
    })();
  },[]);

  const filtered=useMemo(()=>games.filter(g=>g.name.toLowerCase().includes(search.toLowerCase())),[games,search]);

  const getPrice = (pkgs: GamePackage[]) => {
  if (!pkgs.length) {
    return {
      original: 0,
      sale: 0,
    };
  }

  const original = Math.min(...pkgs.map((p) => p.price));

  return {
    original,
    sale: original * 0.7, // 30% OFF
  };
};

  if(loading){
    return <main className="min-h-screen bg-slate-950 flex items-center justify-center text-cyan-400 text-xl">Loading...</main>;
  }

  return (
    <main className="min-h-screen bg-slate-950">
      <section className="py-20 px-6 text-center">
        <h1 className="text-5xl font-black text-white">Top Up <span className="text-cyan-400">Games</span></h1>
        <div className="mx-auto mt-8 max-w-xl flex items-center rounded-xl border border-slate-700 bg-slate-900 px-4">
          <Search className="text-slate-500"/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..." className="w-full bg-transparent p-4 text-white outline-none"/>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((game,index)=>{
            const price = getPrice(game.packages);
            
            return (
            <motion.div key={game._id} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} transition={{delay:index*0.05}}>
              <Link href={`/topup?game=${game.slug}`} className="block overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
                <div className="relative h-64">
                  <Image src={game.image} alt={game.name} fill className="object-cover"/>
                  {game.featured && <div className="absolute left-4 top-4 rounded-full bg-red-500 px-3 py-1 text-white text-xs flex items-center gap-1"><Flame size={14}/>
Sale</div>}
                </div>
                <div className="p-6 space-y-4">
                  <h2 className="text-2xl font-bold text-white">{game.name}</h2>
                  <p className="line-clamp-2 text-slate-400">{game.description || "Instant top up service"}</p>
                  <div className="space-y-1">
                    <p className="text-sm text-slate-500 line-through">
                      ${price.original.toFixed(2)}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-xl font-bold text-cyan-400">
                          ${price.sale.toFixed(2)}
                          </p>

    <span className="rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
      30% OFF
    </span>
  </div>
</div>
                  <button className="w-full rounded-xl bg-cyan-500 py-3 font-bold text-black flex items-center justify-center gap-2">
                    Top Up Now <ArrowRight size={18}/>
                  </button>
                </div>
              </Link>
            </motion.div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
