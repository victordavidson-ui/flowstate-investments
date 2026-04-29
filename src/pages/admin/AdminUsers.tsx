import { useState } from "react";
import { Search, Filter, MoreVertical, ShieldAlert, CheckCircle2, AlertCircle, Ban } from "lucide-react";
import { useAdmin, AdminUser } from "@/contexts/AdminContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export const AdminUsers = () => {
  const { state, updateUserStatus } = useAdmin();
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  const filteredUsers = state.users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground mt-1">Monitor, verify, and control all platform accounts.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search by name, email, ID..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-muted/40 border border-border/60 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-primary/50"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/50 border border-border/50 text-sm font-medium hover:bg-muted transition-colors">
            <Filter className="h-4 w-4" /> Filter
          </button>
        </div>
      </div>

      <div className="glass rounded-3xl overflow-hidden border border-border/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/20 border-b border-border/50">
                <th className="p-4 text-xs font-mono uppercase tracking-wider text-muted-foreground font-medium">User</th>
                <th className="p-4 text-xs font-mono uppercase tracking-wider text-muted-foreground font-medium">Status / KYC</th>
                <th className="p-4 text-xs font-mono uppercase tracking-wider text-muted-foreground font-medium">Balance</th>
                <th className="p-4 text-xs font-mono uppercase tracking-wider text-muted-foreground font-medium">Risk Level</th>
                <th className="p-4 text-xs font-mono uppercase tracking-wider text-muted-foreground font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {filteredUsers.map(user => (
                <tr 
                  key={user.id} 
                  className="hover:bg-muted/10 transition-colors cursor-pointer"
                  onClick={() => setSelectedUser(user)}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center font-bold text-primary">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold flex items-center gap-2">
                          {user.name}
                          {user.badges.includes("VIP") && (
                            <span className="text-[9px] uppercase font-bold tracking-wider bg-warning/20 text-warning px-1.5 py-0.5 rounded">VIP</span>
                          )}
                          {user.badges.includes("Suspicious") && (
                            <span className="text-[9px] uppercase font-bold tracking-wider bg-destructive/20 text-destructive px-1.5 py-0.5 rounded">FLAGGED</span>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground font-mono">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                      user.status === "Verified" ? "bg-success/10 text-success border-success/20" :
                      user.status === "Pending KYC" ? "bg-warning/10 text-warning border-warning/20" :
                      "bg-destructive/10 text-destructive border-destructive/20"
                    }`}>
                      {user.status === "Verified" && <CheckCircle2 className="h-3.5 w-3.5" />}
                      {user.status === "Pending KYC" && <AlertCircle className="h-3.5 w-3.5" />}
                      {user.status === "Suspended" && <Ban className="h-3.5 w-3.5" />}
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 font-mono font-bold">
                    ${user.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${
                        user.riskLevel === "Low" ? "bg-success" :
                        user.riskLevel === "Medium" ? "bg-warning" : "bg-destructive animate-pulse"
                      }`} />
                      <span className="text-sm font-medium">{user.riskLevel}</span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <button className="p-2 hover:bg-muted rounded-xl transition-colors">
                          <MoreVertical className="h-5 w-5 text-muted-foreground" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="glass-strong border-border/40 w-48">
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); updateUserStatus(user.id, "Verified"); }} className="cursor-pointer">
                          <CheckCircle2 className="mr-2 h-4 w-4 text-success" /> Approve KYC
                        </DropdownMenuItem>
                        {user.status !== "Suspended" && (
                          <DropdownMenuItem onClick={(e) => { e.stopPropagation(); updateUserStatus(user.id, "Suspended"); }} className="cursor-pointer text-destructive focus:text-destructive">
                            <Ban className="mr-2 h-4 w-4" /> Suspend Account
                          </DropdownMenuItem>
                        )}
                        {user.status === "Suspended" && (
                          <DropdownMenuItem onClick={(e) => { e.stopPropagation(); updateUserStatus(user.id, "Verified"); }} className="cursor-pointer text-success focus:text-success">
                            <CheckCircle2 className="mr-2 h-4 w-4" /> Reactivate Account
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredUsers.length === 0 && (
            <div className="p-12 text-center text-muted-foreground">
              No users found matching "{search}"
            </div>
          )}
        </div>
      </div>

      <Sheet open={!!selectedUser} onOpenChange={(open) => !open && setSelectedUser(null)}>
        <SheetContent side="right" className="w-[400px] sm:w-[540px] glass-strong border-l border-border/40 p-0">
          {selectedUser && (
            <div className="flex flex-col h-full">
              <div className="p-6 border-b border-border/40 bg-muted/10">
                <SheetHeader>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center text-2xl font-bold text-primary border-2 border-primary/20">
                      {selectedUser.name.charAt(0)}
                    </div>
                    <div>
                      <SheetTitle className="text-2xl">{selectedUser.name}</SheetTitle>
                      <div className="font-mono text-sm text-muted-foreground mt-1">{selectedUser.id}</div>
                    </div>
                  </div>
                </SheetHeader>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                <section>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">Account Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-muted/20 border border-border/40">
                      <div className="text-xs text-muted-foreground mb-1">Email</div>
                      <div className="font-medium text-sm truncate">{selectedUser.email}</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-muted/20 border border-border/40">
                      <div className="text-xs text-muted-foreground mb-1">Total Balance</div>
                      <div className="font-mono font-bold text-lg text-primary">${selectedUser.balance.toLocaleString()}</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-muted/20 border border-border/40">
                      <div className="text-xs text-muted-foreground mb-1">Current Plan</div>
                      <div className="font-medium">{selectedUser.plan} Tier</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-muted/20 border border-border/40">
                      <div className="text-xs text-muted-foreground mb-1">Join Date</div>
                      <div className="font-medium text-sm">{new Date(selectedUser.joinedAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">Risk & Security</h3>
                  <div className="p-4 rounded-2xl border border-border/40 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">KYC Status</span>
                      <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                        selectedUser.status === "Verified" ? "bg-success/20 text-success" : 
                        selectedUser.status === "Suspended" ? "bg-destructive/20 text-destructive" : "bg-warning/20 text-warning"
                      }`}>{selectedUser.status}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Risk Assessment</span>
                      <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                        selectedUser.riskLevel === "Low" ? "bg-success/20 text-success" : 
                        selectedUser.riskLevel === "High" ? "bg-destructive/20 text-destructive" : "bg-warning/20 text-warning"
                      }`}>{selectedUser.riskLevel}</span>
                    </div>
                  </div>
                </section>
              </div>

              <div className="p-6 border-t border-border/40 bg-muted/10 flex flex-col gap-3">
                {selectedUser.status === "Pending KYC" && (
                  <Button onClick={() => updateUserStatus(selectedUser.id, "Verified")} className="w-full bg-success hover:bg-success/90 text-success-foreground font-bold">
                    Approve KYC Documents
                  </Button>
                )}
                {selectedUser.status !== "Suspended" ? (
                  <Button variant="destructive" onClick={() => updateUserStatus(selectedUser.id, "Suspended")} className="w-full font-bold">
                    <ShieldAlert className="mr-2 h-4 w-4" /> Suspend Account
                  </Button>
                ) : (
                  <Button variant="outline" onClick={() => updateUserStatus(selectedUser.id, "Verified")} className="w-full border-success text-success hover:bg-success/10 font-bold">
                    Reactivate Account
                  </Button>
                )}
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};
