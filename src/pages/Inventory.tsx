import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Download, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ExportReportModal } from "@/components/ExportReportModal";

const mockInventory = [
  { id: 1, name: "Facial Cleanser", category: "Skincare", supplier: "Beauty Supplies Co.", quantity: 45, status: "Sufficient", lastUpdated: "2025-01-15" },
  { id: 2, name: "Hydrating Serum", category: "Skincare", supplier: "Beauty Supplies Co.", quantity: 8, status: "Low", lastUpdated: "2025-01-16" },
  { id: 3, name: "Massage Oil", category: "Wellness", supplier: "Wellness Products Inc.", quantity: 60, status: "Sufficient", lastUpdated: "2025-01-14" },
  { id: 4, name: "IV Drip Solution", category: "Medical", supplier: "MedSupply Corp.", quantity: 120, status: "Sufficient", lastUpdated: "2025-01-18" },
  { id: 5, name: "Disposable Gloves", category: "Supplies", supplier: "MedSupply Corp.", quantity: 15, status: "Low", lastUpdated: "2025-01-19" },
  { id: 6, name: "Vitamin C Ampules", category: "Medical", supplier: "PharmaCare Ltd.", quantity: 95, status: "Sufficient", lastUpdated: "2025-01-17" },
  { id: 7, name: "Slimming Gel", category: "Body Care", supplier: "Beauty Supplies Co.", quantity: 5, status: "Low", lastUpdated: "2025-01-20" },
  { id: 8, name: "Face Masks", category: "Skincare", supplier: "Beauty Supplies Co.", quantity: 150, status: "Sufficient", lastUpdated: "2025-01-16" },
  { id: 9, name: "Antiseptic Solution", category: "Medical", supplier: "MedSupply Corp.", quantity: 35, status: "Sufficient", lastUpdated: "2025-01-19" },
  { id: 10, name: "Hot Stone Set", category: "Equipment", supplier: "Spa Equipment Pro", quantity: 3, status: "Low", lastUpdated: "2025-01-15" },
];

export default function Inventory() {
  const { toast } = useToast();
  const [inventory, setInventory] = useState(mockInventory);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [supplierFilter, setSupplierFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const filteredInventory = inventory.filter((item) => {
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    const matchesSupplier = supplierFilter === "all" || item.supplier === supplierFilter;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSupplier && matchesSearch;
  });

  const lowStockCount = filteredInventory.filter(i => i.status === "Low").length;

  const handleDelete = () => {
    setInventory(inventory.filter(i => i.id !== selectedItem?.id));
    setDeleteDialogOpen(false);
    toast({ title: "Item deleted successfully" });
  };

  const exportData = filteredInventory.map(i => ({
    Item_Name: i.name,
    Category: i.category,
    Supplier: i.supplier,
    Quantity: i.quantity,
    Status: i.status,
    Last_Updated: i.lastUpdated
  }));

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-heading font-bold">Inventory Management</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setExportModalOpen(true)}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={() => setAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Item
          </Button>
        </div>
      </div>

      {lowStockCount > 0 && (
        <Card className="p-4 border-destructive bg-destructive/10">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <p className="font-medium">
              Warning: {lowStockCount} item{lowStockCount > 1 ? 's' : ''} running low on stock!
            </p>
          </div>
        </Card>
      )}

      <Card className="p-6">
        <div className="flex flex-wrap gap-4 mb-6">
          <Input
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-xs"
          />
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Skincare">Skincare</SelectItem>
              <SelectItem value="Wellness">Wellness</SelectItem>
              <SelectItem value="Medical">Medical</SelectItem>
              <SelectItem value="Supplies">Supplies</SelectItem>
              <SelectItem value="Equipment">Equipment</SelectItem>
            </SelectContent>
          </Select>
          <Select value={supplierFilter} onValueChange={setSupplierFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Supplier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Suppliers</SelectItem>
              <SelectItem value="Beauty Supplies Co.">Beauty Supplies Co.</SelectItem>
              <SelectItem value="MedSupply Corp.">MedSupply Corp.</SelectItem>
              <SelectItem value="Wellness Products Inc.">Wellness Products Inc.</SelectItem>
              <SelectItem value="PharmaCare Ltd.">PharmaCare Ltd.</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInventory.map((item) => (
              <TableRow key={item.id} className={item.status === "Low" ? "bg-destructive/5" : ""}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.supplier}</TableCell>
                <TableCell className={item.status === "Low" ? "text-destructive font-bold" : ""}>
                  {item.quantity}
                </TableCell>
                <TableCell>
                  <Badge variant={item.status === "Sufficient" ? "default" : "destructive"}>
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>{item.lastUpdated}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedItem(item);
                        setEditDialogOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        setSelectedItem(item);
                        setDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Add Item Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Item</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Item Name</Label>
              <Input placeholder="Enter item name" />
            </div>
            <div>
              <Label>Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Skincare">Skincare</SelectItem>
                  <SelectItem value="Wellness">Wellness</SelectItem>
                  <SelectItem value="Medical">Medical</SelectItem>
                  <SelectItem value="Supplies">Supplies</SelectItem>
                  <SelectItem value="Equipment">Equipment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Supplier</Label>
              <Input placeholder="Enter supplier name" />
            </div>
            <div>
              <Label>Quantity</Label>
              <Input type="number" placeholder="Enter quantity" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => { setAddDialogOpen(false); toast({ title: "Item added successfully" }); }}>
              Add Item
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Item Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Item Name</Label>
              <Input defaultValue={selectedItem?.name} />
            </div>
            <div>
              <Label>Category</Label>
              <Select defaultValue={selectedItem?.category}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Skincare">Skincare</SelectItem>
                  <SelectItem value="Wellness">Wellness</SelectItem>
                  <SelectItem value="Medical">Medical</SelectItem>
                  <SelectItem value="Supplies">Supplies</SelectItem>
                  <SelectItem value="Equipment">Equipment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Supplier</Label>
              <Input defaultValue={selectedItem?.supplier} />
            </div>
            <div>
              <Label>Quantity</Label>
              <Input type="number" defaultValue={selectedItem?.quantity} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => { setEditDialogOpen(false); toast({ title: "Item updated successfully" }); }}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Item</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete "{selectedItem?.name}"? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ExportReportModal
        open={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        reportType="Inventory Report"
        branch="All Branches"
        data={exportData}
        totals={{
          total_items: filteredInventory.length,
          low_stock_items: lowStockCount
        }}
      />
    </div>
  );
}
