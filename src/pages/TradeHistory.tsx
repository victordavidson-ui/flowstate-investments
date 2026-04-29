import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { usePortfolio } from "@/contexts/PortfolioContext";

const TradeHistoryPage = () => {
  const { state } = usePortfolio();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glass rounded-3xl p-6 md:p-8">
        <h2 className="text-2xl font-display font-semibold mb-6">Trading History</h2>
        
        <div className="space-y-3">
          {state.trades.map(trade => (
            <div key={trade.id} className="glass rounded-xl border border-border/50 overflow-hidden transition-all hover:border-primary/30 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    trade.side === "Buy" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                  }`}>
                    <span className="font-bold text-sm">{trade.side === "Buy" ? "B" : "S"}</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold flex items-center gap-2">
                      {trade.side} {trade.pair}
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider flex items-center gap-1 ${
                        trade.status === "Filled" ? "bg-success/10 text-success" : 
                        trade.status === "Pending" ? "bg-warning/10 text-warning" : "bg-destructive/10 text-destructive"
                      }`}>
                        {trade.status === "Filled" ? <CheckCircle2 className="h-3 w-3" /> : trade.status === "Pending" ? <Clock className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                        {trade.status}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">{new Date(trade.date).toLocaleString()}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-mono font-medium ${trade.side === "Buy" ? "text-success" : "text-destructive"}`}>
                    {trade.side === "Buy" ? "+" : "-"}{trade.amount}
                  </div>
                  <div className="text-xs text-muted-foreground">@ ${trade.price} (Total: ${trade.total})</div>
                </div>
              </div>
            </div>
          ))}

          {state.trades.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No trades executed yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TradeHistoryPage;
