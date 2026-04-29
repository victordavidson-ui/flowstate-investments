import { useState } from "react";
import { Search, Filter, CheckCircle2, XCircle, Clock } from "lucide-react";
import { useAdmin, AdminTransaction } from "@/contexts/AdminContext";
import { toast } from "sonner";

export const AdminTransactions = () => {
  const { state, updateTransactionStatus } = useAdmin();
  const [filterType, setFilterType] = useState<"All" | "Deposit" | "Withdrawal" | "Trade">("All");

  const filtered = state.transactions.filter(t => filterType === "All" || t.type === filterType);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold">Transactions</h1>
          <p className="text-muted-foreground">Monitor and manage platform cash flow.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search TXID or User..." 
              className="w-full bg-muted/40 border border-border/60 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-primary/50"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/50 border border-border/50 text-sm font-medium hover:bg-muted transition-colors">
            <Filter className="h-4 w-4" /> Filter
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        {(["All", "Deposit", "Withdrawal", "Trade"] as const).map(type => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filterType === type 
                ? "bg-primary/20 text-primary border border-primary/30" 
                : "bg-muted/30 text-muted-foreground hover:bg-muted"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="glass rounded-3xl overflow-hidden border border-border/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/50 bg-muted/20">
                <th className="p-4 text-xs font-mono uppercase tracking-wider text-muted-foreground font-medium">TXID</th>
                <th className="p-4 text-xs font-mono uppercase tracking-wider text-muted-foreground font-medium">User</th>
                <th className="p-4 text-xs font-mono uppercase tracking-wider text-muted-foreground font-medium">Type</th>
                <th className="p-4 text-xs font-mono uppercase tracking-wider text-muted-foreground font-medium">Amount</th>
                <th className="p-4 text-xs font-mono uppercase tracking-wider text-muted-foreground font-medium">Date</th>
                <th className="p-4 text-xs font-mono uppercase tracking-wider text-muted-foreground font-medium">Status</th>
                <th className="p-4 text-xs font-mono uppercase tracking-wider text-muted-foreground font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {filtered.map(tx => (
                <tr key={tx.id} className="hover:bg-muted/10 transition-colors">
                  <td className="p-4 font-mono text-xs text-muted-foreground">{tx.id}</td>
                  <td className="p-4 font-medium">{tx.userName} <span className="text-xs text-muted-foreground block">{tx.userId}</span></td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-muted/50 border border-border/50">
                      {tx.type}
                    </span>
                  </td>
                  <td className="p-4 font-mono font-bold">${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  <td className="p-4 text-xs text-muted-foreground">{new Date(tx.date).toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium uppercase tracking-wider ${
                      tx.status === "Completed" ? "text-success bg-success/10" :
                      tx.status === "Pending" ? "text-warning bg-warning/10" : "text-destructive bg-destructive/10"
                    }`}>
                      {tx.status === "Completed" && <CheckCircle2 className="h-3 w-3" />}
                      {tx.status === "Pending" && <Clock className="h-3 w-3" />}
                      {tx.status === "Failed" && <XCircle className="h-3 w-3" />}
                      {tx.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    {tx.status === "Pending" && (
                      <>
                        <button 
                          onClick={() => updateTransactionStatus(tx.id, "Completed")}
                          className="px-2 py-1 rounded bg-success/10 text-success hover:bg-success/20 text-xs font-semibold transition-colors"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => updateTransactionStatus(tx.id, "Failed")}
                          className="px-2 py-1 rounded bg-destructive/10 text-destructive hover:bg-destructive/20 text-xs font-semibold transition-colors"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="p-12 text-center text-muted-foreground">
              No transactions found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
