import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Eye, FileText, Download } from "lucide-react";
import { ExportReportModal } from "@/components/ExportReportModal";

const mockTransactions = [
  { id: "TXN001", client: "Maria Santos", appointmentId: "APT001", service: "Diamond Peel Facial", amount: "₱2,500", mode: "Cash", date: "2025-01-15", status: "Paid", branch: "Baliuag" },
  { id: "TXN002", client: "Anna Cruz", appointmentId: "APT002", service: "Cavitation Slimming", amount: "₱3,000", mode: "Card", date: "2025-01-15", status: "Paid", branch: "Baliuag" },
  { id: "TXN003", client: "Sofia Garcia", appointmentId: "APT003", service: "Glutathione IV Drip", amount: "₱2,000", mode: "Transfer", date: "2025-01-16", status: "Pending", branch: "Malolos" },
  { id: "TXN004", client: "Isabella Reyes", appointmentId: "APT004", service: "Hydrating Glow Facial", amount: "₱1,800", mode: "Cash", date: "2025-01-16", status: "Paid", branch: "Baliuag" },
  { id: "TXN005", client: "Gabriela Torres", appointmentId: "APT005", service: "RF Body Contouring", amount: "₱4,000", mode: "Card", date: "2025-01-17", status: "Paid", branch: "Malolos" },
  { id: "TXN006", client: "Valentina Lopez", appointmentId: "APT006", service: "Vitamin C Booster Drip", amount: "₱2,500", mode: "Cash", date: "2025-01-17", status: "Paid", branch: "Baliuag" },
  { id: "TXN007", client: "Camila Mendoza", appointmentId: "APT007", service: "Full Body Massage", amount: "₱1,500", mode: "Transfer", date: "2025-01-18", status: "Paid", branch: "Malolos" },
  { id: "TXN008", client: "Lucia Ramirez", appointmentId: "APT008", service: "Anti-Aging Facial", amount: "₱3,500", mode: "Card", date: "2025-01-18", status: "Refunded", branch: "Baliuag" },
  { id: "TXN009", client: "Elena Morales", appointmentId: "APT009", service: "Energy Boost IV Therapy", amount: "₱2,200", mode: "Cash", date: "2025-01-19", status: "Paid", branch: "Malolos" },
  { id: "TXN010", client: "Carmen Flores", appointmentId: "APT010", service: "Acne Treatment Facial", amount: "₱2,200", mode: "Transfer", date: "2025-01-19", status: "Pending", branch: "Baliuag" },
];

export default function Payments() {
  const [branch, setBranch] = useState("all");
  const [paymentMode, setPaymentMode] = useState("all");
  const [status, setStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [receiptDialogOpen, setReceiptDialogOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  const filteredTransactions = mockTransactions.filter((txn) => {
    const matchesBranch = branch === "all" || txn.branch === branch;
    const matchesMode = paymentMode === "all" || txn.mode === paymentMode;
    const matchesStatus = status === "all" || txn.status === status;
    const matchesSearch = txn.client.toLowerCase().includes(searchQuery.toLowerCase()) || txn.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBranch && matchesMode && matchesStatus && matchesSearch;
  });

  const totalIncome = filteredTransactions
    .filter(t => t.status === "Paid")
    .reduce((sum, t) => sum + parseFloat(t.amount.replace(/[₱,]/g, "")), 0);
  const pendingPayments = filteredTransactions.filter(t => t.status === "Pending").length;
  const refunds = filteredTransactions.filter(t => t.status === "Refunded").length;

  const exportData = filteredTransactions.map(t => ({
    Transaction_ID: t.id,
    Client: t.client,
    Service: t.service,
    Amount: t.amount,
    Mode: t.mode,
    Date: t.date,
    Status: t.status,
    Branch: t.branch
  }));

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-heading font-bold">Payment Management</h1>
        <Button onClick={() => setExportModalOpen(true)}>
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Total Income</p>
          <p className="text-3xl font-bold text-primary">₱{totalIncome.toLocaleString()}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Pending Payments</p>
          <p className="text-3xl font-bold text-gold">{pendingPayments}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Refunds</p>
          <p className="text-3xl font-bold text-destructive">{refunds}</p>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex flex-wrap gap-4 mb-6">
          <Input
            placeholder="Search by client or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-xs"
          />
          <Select value={branch} onValueChange={setBranch}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Branch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Branches</SelectItem>
              <SelectItem value="Baliuag">Baliuag</SelectItem>
              <SelectItem value="Malolos">Malolos</SelectItem>
            </SelectContent>
          </Select>
          <Select value={paymentMode} onValueChange={setPaymentMode}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Payment Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Modes</SelectItem>
              <SelectItem value="Cash">Cash</SelectItem>
              <SelectItem value="Card">Card</SelectItem>
              <SelectItem value="Transfer">Transfer</SelectItem>
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Mode</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((txn) => (
              <TableRow key={txn.id}>
                <TableCell className="font-medium">{txn.id}</TableCell>
                <TableCell>{txn.client}</TableCell>
                <TableCell>{txn.service}</TableCell>
                <TableCell>{txn.amount}</TableCell>
                <TableCell>{txn.mode}</TableCell>
                <TableCell>{txn.date}</TableCell>
                <TableCell>
                  <Badge variant={txn.status === "Paid" ? "default" : txn.status === "Pending" ? "secondary" : "destructive"}>
                    {txn.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedTransaction(txn);
                        setViewDialogOpen(true);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedTransaction(txn);
                        setReceiptDialogOpen(true);
                      }}
                    >
                      <FileText className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* View Details Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Transaction ID</p>
                <p className="font-medium">{selectedTransaction?.id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge variant={selectedTransaction?.status === "Paid" ? "default" : "secondary"}>
                  {selectedTransaction?.status}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Client</p>
                <p className="font-medium">{selectedTransaction?.client}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Branch</p>
                <p className="font-medium">{selectedTransaction?.branch}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Service</p>
                <p className="font-medium">{selectedTransaction?.service}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Amount</p>
                <p className="font-medium text-lg">{selectedTransaction?.amount}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Payment Mode</p>
                <p className="font-medium">{selectedTransaction?.mode}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium">{selectedTransaction?.date}</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Receipt Dialog */}
      <Dialog open={receiptDialogOpen} onOpenChange={setReceiptDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center font-heading">KENDI Beauty Lounge & Wellness</DialogTitle>
            <p className="text-center text-sm text-muted-foreground">Official Receipt</p>
          </DialogHeader>
          <div className="space-y-4 border-t pt-4">
            <div className="flex justify-between">
              <span className="text-sm">Receipt No:</span>
              <span className="font-medium">{selectedTransaction?.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Client:</span>
              <span className="font-medium">{selectedTransaction?.client}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Service:</span>
              <span className="font-medium">{selectedTransaction?.service}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Date:</span>
              <span className="font-medium">{selectedTransaction?.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Payment Mode:</span>
              <span className="font-medium">{selectedTransaction?.mode}</span>
            </div>
            <div className="border-t pt-4 flex justify-between text-lg">
              <span className="font-semibold">Total Amount:</span>
              <span className="font-bold text-primary">{selectedTransaction?.amount}</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ExportReportModal
        open={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        reportType="Payment Transaction Report"
        branch={branch === "all" ? "All Branches" : branch}
        data={exportData}
        totals={{
          total_income: `₱${totalIncome.toLocaleString()}`,
          total_transactions: filteredTransactions.length,
          pending: pendingPayments,
          refunds: refunds
        }}
      />
    </div>
  );
}
