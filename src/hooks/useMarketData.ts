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
  image?: string;
};

const genSpark = (trend: number, length = 24) =>
  Array.from({ length }, (_, i) => 50 + Math.sin(i / 3) * 8 + i * trend + Math.random() * 4);

const initialAssets: Asset[] = [
  { sym: "BTC", name: "Bitcoin", type: "crypto", price: 67000, change24h: 0, volume: "$35B", marketCap: "$1.3T", spark: genSpark(0.8) },
  { sym: "ETH", name: "Ethereum", type: "crypto", price: 3500, change24h: 0, volume: "$18B", marketCap: "$420B", spark: genSpark(0.5) },
  { sym: "BNB", name: "Binance Coin", type: "crypto", price: 600, change24h: 0, volume: "$1.2B", marketCap: "$90B", spark: genSpark(0.3) },
  { sym: "SOL", name: "Solana", type: "crypto", price: 150, change24h: 0, volume: "$4.5B", marketCap: "$65B", spark: genSpark(1.2) },
  { sym: "XRP", name: "Ripple", type: "crypto", price: 0.5, change24h: 0, volume: "$1.1B", marketCap: "$28B", spark: genSpark(-0.1) },
  { sym: "ADA", name: "Cardano", type: "crypto", price: 0.45, change24h: 0, volume: "$300M", marketCap: "$16B", spark: genSpark(-0.2) },
  { sym: "AVAX", name: "Avalanche", type: "crypto", price: 35, change24h: 0, volume: "$500M", marketCap: "$13B", spark: genSpark(0.4) },
  { sym: "DOGE", name: "Dogecoin", type: "crypto", price: 0.15, change24h: 0, volume: "$800M", marketCap: "$22B", spark: genSpark(0.1) },
  { sym: "DOT", name: "Polkadot", type: "crypto", price: 7, change24h: 0, volume: "$200M", marketCap: "$10B", spark: genSpark(0.2) },
  { sym: "TRX", name: "TRON", type: "crypto", price: 0.12, change24h: 0, volume: "$300M", marketCap: "$11B", spark: genSpark(0.3) },
  { sym: "LINK", name: "Chainlink", type: "crypto", price: 15, change24h: 0, volume: "$400M", marketCap: "$9B", spark: genSpark(0.5) },
  { sym: "MATIC", name: "Polygon", type: "crypto", price: 0.7, change24h: 0, volume: "$300M", marketCap: "$7B", spark: genSpark(-0.1) },
  { sym: "LTC", name: "Litecoin", type: "crypto", price: 80, change24h: 0, volume: "$400M", marketCap: "$6B", spark: genSpark(0.1) },
  { sym: "BCH", name: "Bitcoin Cash", type: "crypto", price: 450, change24h: 0, volume: "$500M", marketCap: "$9B", spark: genSpark(0.6) },
  { sym: "SHIB", name: "Shiba Inu", type: "crypto", price: 0.000025, change24h: 0, volume: "$600M", marketCap: "$15B", spark: genSpark(0.8) },
  { sym: "UNI", name: "Uniswap", type: "crypto", price: 8, change24h: 0, volume: "$150M", marketCap: "$5B", spark: genSpark(0.2) },
  { sym: "NEAR", name: "Near Protocol", type: "crypto", price: 6, change24h: 0, volume: "$400M", marketCap: "$6B", spark: genSpark(1.1) },
  { sym: "PEPE", name: "Pepe", type: "crypto", price: 0.000008, change24h: 0, volume: "$1.2B", marketCap: "$3B", spark: genSpark(2.5) },
  { sym: "FET", name: "Fetch.ai", type: "crypto", price: 2.2, change24h: 0, volume: "$200M", marketCap: "$1.8B", spark: genSpark(1.5) },
  { sym: "STX", name: "Stacks", type: "crypto", price: 2.5, change24h: 0, volume: "$100M", marketCap: "$3.5B", spark: genSpark(0.4) },
  
  // Stocks
  { sym: "AAPL", name: "Apple Inc.", type: "stock", price: 228.12, change24h: 1.2, volume: "$6B", marketCap: "$3.5T", spark: genSpark(0.3) },
  { sym: "NVDA", name: "NVIDIA Corp.", type: "stock", price: 118.4, change24h: 4.5, volume: "$25B", marketCap: "$2.9T", spark: genSpark(2.1) },
  { sym: "TSLA", name: "Tesla Inc.", type: "stock", price: 245.2, change24h: -2.1, volume: "$15B", marketCap: "$780B", spark: genSpark(-0.8) },
  { sym: "MSFT", name: "Microsoft", type: "stock", price: 430.5, change24h: 0.8, volume: "$4B", marketCap: "$3.2T", spark: genSpark(0.2) },
  { sym: "AMZN", name: "Amazon", type: "stock", price: 185.1, change24h: 1.5, volume: "$5B", marketCap: "$1.9T", spark: genSpark(0.5) },
  { sym: "META", name: "Meta Platforms", type: "stock", price: 510.4, change24h: -0.5, volume: "$3B", marketCap: "$1.3T", spark: genSpark(-0.1) },
  { sym: "GOOGL", name: "Alphabet Inc.", type: "stock", price: 182.1, change24h: 0.3, volume: "$2B", marketCap: "$2.3T", spark: genSpark(0.1) },
  { sym: "COST", name: "Costco", type: "stock", price: 840.5, change24h: 1.1, volume: "$1B", marketCap: "$370B", spark: genSpark(0.4) },
  { sym: "WMT", name: "Walmart", type: "stock", price: 68.2, change24h: 0.5, volume: "$1.2B", marketCap: "$550B", spark: genSpark(0.2) },
  { sym: "JPM", name: "JPMorgan", type: "stock", price: 205.4, change24h: 0.7, volume: "$1.5B", marketCap: "$590B", spark: genSpark(0.3) },
  { sym: "V", name: "Visa", type: "stock", price: 275.2, change24h: 0.4, volume: "$1.1B", marketCap: "$560B", spark: genSpark(0.2) },
];

export const useMarketData = () => {
  const [assets, setAssets] = useState<Asset[]>(initialAssets);

  const fetchCryptoPrices = async () => {
    try {
      const ids = initialAssets
        .filter(a => a.type === "crypto")
        .map(a => a.name.toLowerCase().replace(/ /g, "-"))
        .join(",");
      
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&sparkline=true&price_change_percentage=24h`);
      const data = await res.json();

      if (Array.isArray(data)) {
        setAssets(prev => prev.map(asset => {
          if (asset.type === "stock") return asset;
          const live = data.find(d => d.symbol.toUpperCase() === asset.sym);
          if (!live) return asset;
          return {
            ...asset,
            price: live.current_price,
            change24h: live.price_change_percentage_24h,
            marketCap: `$${(live.market_cap / 1e9).toFixed(1)}B`,
            spark: live.sparkline_in_7d?.price.slice(-24) || asset.spark,
            image: live.image
          };
        }));
      }
    } catch (e) {
      console.error("Failed to fetch live prices", e);
    }
  };

  useEffect(() => {
    fetchCryptoPrices();
    const interval = setInterval(fetchCryptoPrices, 30000); // Update every 30 seconds to stay within free tier limits
    return () => clearInterval(interval);
  }, []);

  return { assets };
};
