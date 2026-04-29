import { useState, useEffect } from "react";

export type Asset = {
  sym: string;
  name: string;
  type: "crypto" | "stock";
  price: number;
  change24h: number;
  volume: string;
  marketCap: string;
  spark: number[];
};

const genSpark = (trend: number, length = 24) =>
  Array.from({ length }, (_, i) => 50 + Math.sin(i / 3) * 8 + i * trend + Math.random() * 4);

const initialAssets: Asset[] = [
  { sym: "BTC", name: "Bitcoin", type: "crypto", price: 67432.18, change24h: 2.41, volume: "$28.4B", marketCap: "$1.32T", spark: genSpark(0.8) },
  { sym: "ETH", name: "Ethereum", type: "crypto", price: 3521.9, change24h: 1.82, volume: "$14.2B", marketCap: "$423B", spark: genSpark(0.5) },
  { sym: "SOL", name: "Solana", type: "crypto", price: 184.22, change24h: -0.64, volume: "$3.1B", marketCap: "$86B", spark: genSpark(-0.3) },
  { sym: "AVAX", name: "Avalanche", type: "crypto", price: 38.71, change24h: 4.02, volume: "$890M", marketCap: "$15B", spark: genSpark(1.1) },
  { sym: "DOGE", name: "Dogecoin", type: "crypto", price: 0.1421, change24h: -2.1, volume: "$680M", marketCap: "$20B", spark: genSpark(-0.6) },
  { sym: "LINK", name: "Chainlink", type: "crypto", price: 17.84, change24h: 1.15, volume: "$420M", marketCap: "$10.5B", spark: genSpark(0.4) },
  { sym: "AAPL", name: "Apple Inc.", type: "stock", price: 229.87, change24h: 0.91, volume: "$6.8B", marketCap: "$3.5T", spark: genSpark(0.3) },
  { sym: "TSLA", name: "Tesla Inc.", type: "stock", price: 248.5, change24h: -1.23, volume: "$12.4B", marketCap: "$790B", spark: genSpark(-0.4) },
  { sym: "NVDA", name: "NVIDIA Corp.", type: "stock", price: 1142.04, change24h: 3.18, volume: "$22.1B", marketCap: "$2.8T", spark: genSpark(1.2) },
  { sym: "MSFT", name: "Microsoft", type: "stock", price: 428.12, change24h: 0.52, volume: "$5.2B", marketCap: "$3.2T", spark: genSpark(0.2) },
  { sym: "AMZN", name: "Amazon", type: "stock", price: 186.92, change24h: 1.65, volume: "$8.1B", marketCap: "$1.95T", spark: genSpark(0.6) },
  { sym: "META", name: "Meta Platforms", type: "stock", price: 512.28, change24h: -0.82, volume: "$4.3B", marketCap: "$1.3T", spark: genSpark(-0.2) },
  { sym: "ADA", name: "Cardano", type: "crypto", price: 0.45, change24h: 1.2, volume: "$320M", marketCap: "$16B", spark: genSpark(0.1) },
  { sym: "XRP", name: "Ripple", type: "crypto", price: 0.52, change24h: -0.5, volume: "$1.2B", marketCap: "$28B", spark: genSpark(-0.1) },
  { sym: "DOT", name: "Polkadot", type: "crypto", price: 6.80, change24h: 2.1, volume: "$210M", marketCap: "$8.5B", spark: genSpark(0.5) },
  { sym: "MATIC", name: "Polygon", type: "crypto", price: 0.65, change24h: 3.4, volume: "$400M", marketCap: "$6.2B", spark: genSpark(0.8) },
  { sym: "GOOGL", name: "Alphabet Inc.", type: "stock", price: 178.20, change24h: 0.4, volume: "$3.8B", marketCap: "$2.2T", spark: genSpark(0.2) },
  { sym: "NFLX", name: "Netflix Inc.", type: "stock", price: 620.40, change24h: 2.5, volume: "$2.1B", marketCap: "$270B", spark: genSpark(0.6) },
  { sym: "AMD", name: "Advanced Micro Devices", type: "stock", price: 165.30, change24h: 4.2, volume: "$8.5B", marketCap: "$265B", spark: genSpark(1.5) },
];

export const useMarketData = () => {
  const [assets, setAssets] = useState<Asset[]>(initialAssets);

  useEffect(() => {
    const interval = setInterval(() => {
      setAssets((prev) =>
        prev.map((asset) => {
          // Simulate a random price change between -0.5% and +0.5%
          const changePercent = (Math.random() - 0.5) * 0.01;
          const newPrice = asset.price * (1 + changePercent);
          
          // Update 24h change slightly
          const newChange24h = asset.change24h + (changePercent * 10);
          
          // Add new data point to sparkline
          const newSparkPoint = asset.spark[asset.spark.length - 1] * (1 + changePercent * 2);
          const newSpark = [...asset.spark.slice(1), newSparkPoint];

          return {
            ...asset,
            price: newPrice,
            change24h: newChange24h,
            spark: newSpark,
          };
        })
      );
    }, 2500); // Update every 2.5 seconds

    return () => clearInterval(interval);
  }, []);

  return { assets };
};
