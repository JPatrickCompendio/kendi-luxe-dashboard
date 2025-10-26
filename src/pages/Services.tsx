import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockServices = [
  { id: 1, name: "Diamond Peel Facial", category: "Facial", duration: "60 min", price: "₱2,500", status: "Active" },
  { id: 2, name: "Hydrating Glow Facial", category: "Facial", duration: "45 min", price: "₱1,800", status: "Active" },
  { id: 3, name: "Anti-Aging Facial Treatment", category: "Facial", duration: "90 min", price: "₱3,500", status: "Active" },
  { id: 4, name: "Cavitation Slimming", category: "Slimming", duration: "60 min", price: "₱3,000", status: "Active" },
  { id: 5, name: "RF Body Contouring", category: "Slimming", duration: "75 min", price: "₱4,000", status: "Active" },
  { id: 6, name: "Glutathione IV Drip", category: "Drip", duration: "30 min", price: "₱2,000", status: "Active" },
  { id: 7, name: "Vitamin C Booster Drip", category: "Drip", duration: "45 min", price: "₱2,500", status: "Active" },
  { id: 8, name: "Energy Boost IV Therapy", category: "Drip", duration: "40 min", price: "₱2,200", status: "Active" },
  { id: 9, name: "Full Body Massage", category: "Wellness", duration: "90 min", price: "₱1,500", status: "Active" },
  { id: 10, name: "Hot Stone Therapy", category: "Wellness", duration: "60 min", price: "₱1,800", status: "Inactive" },
  { id: 11, name: "Acne Treatment Facial", category: "Facial", duration: "60 min", price: "₱2,200", status: "Active" },
  { id: 12, name: "Detox IV Drip", category: "Drip", duration: "50 min", price: "₱3,000", status: "Active" },
];

export default function Services() {
  const { toast } = useToast();
  const [services, setServices] = useState(mockServices);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [packageDialogOpen, setPackageDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);

  const filteredServices = services.filter((service) => {
    const matchesCategory = categoryFilter === "all" || service.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || service.status === statusFilter;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const handleToggleStatus = (id: number) => {
    setServices(services.map(s => 
      s.id === id ? { ...s, status: s.status === "Active" ? "Inactive" : "Active" } : s
    ));
    toast({ title: "Service status updated" });
  };

  const handleDelete = () => {
    setServices(services.filter(s => s.id !== selectedService?.id));
    setDeleteDialogOpen(false);
    toast({ title: "Service deleted successfully" });
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-heading font-bold">Service Management</h1>
        <div className="flex gap-2">
          <Button onClick={() => setPackageDialogOpen(true)} variant="outline">
            <Package className="mr-2 h-4 w-4" />
            Create Package
          </Button>
          <Button onClick={() => setAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Service
          </Button>
        </div>
      </div>

      <Card className="p-6">
        <div className="flex flex-wrap gap-4 mb-6">
          <Input
            placeholder="Search services..."
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
              <SelectItem value="Facial">Facial</SelectItem>
              <SelectItem value="Slimming">Slimming</SelectItem>
              <SelectItem value="Drip">Drip</SelectItem>
              <SelectItem value="Wellness">Wellness</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredServices.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="font-medium">{service.name}</TableCell>
                <TableCell>{service.category}</TableCell>
                <TableCell>{service.duration}</TableCell>
                <TableCell>{service.price}</TableCell>
                <TableCell>
                  <Badge variant={service.status === "Active" ? "default" : "secondary"}>
                    {service.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedService(service);
                        setEditDialogOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleToggleStatus(service.id)}
                    >
                      <Switch checked={service.status === "Active"} />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        setSelectedService(service);
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

      {/* Add Service Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Service</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Service Name</Label>
              <Input placeholder="Enter service name" />
            </div>
            <div>
              <Label>Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Facial">Facial</SelectItem>
                  <SelectItem value="Slimming">Slimming</SelectItem>
                  <SelectItem value="Drip">Drip</SelectItem>
                  <SelectItem value="Wellness">Wellness</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Duration</Label>
              <Input placeholder="e.g., 60 min" />
            </div>
            <div>
              <Label>Price</Label>
              <Input placeholder="e.g., ₱2,500" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => { setAddDialogOpen(false); toast({ title: "Service added successfully" }); }}>
              Add Service
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Service Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Service Name</Label>
              <Input defaultValue={selectedService?.name} />
            </div>
            <div>
              <Label>Category</Label>
              <Select defaultValue={selectedService?.category}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Facial">Facial</SelectItem>
                  <SelectItem value="Slimming">Slimming</SelectItem>
                  <SelectItem value="Drip">Drip</SelectItem>
                  <SelectItem value="Wellness">Wellness</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Duration</Label>
              <Input defaultValue={selectedService?.duration} />
            </div>
            <div>
              <Label>Price</Label>
              <Input defaultValue={selectedService?.price} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => { setEditDialogOpen(false); toast({ title: "Service updated successfully" }); }}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Service</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedService?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Package Dialog */}
      <Dialog open={packageDialogOpen} onOpenChange={setPackageDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Service Package</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Package Name</Label>
              <Input placeholder="e.g., Ultimate Glow Package" />
            </div>
            <div>
              <Label>Select Services</Label>
              <div className="border rounded-lg p-4 space-y-2 max-h-64 overflow-y-auto">
                {services.slice(0, 6).map((service) => (
                  <div key={service.id} className="flex items-center space-x-2">
                    <input type="checkbox" id={`pkg-${service.id}`} />
                    <label htmlFor={`pkg-${service.id}`} className="text-sm">
                      {service.name} - {service.price}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label>Package Price</Label>
              <Input placeholder="e.g., ₱8,000" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPackageDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => { setPackageDialogOpen(false); toast({ title: "Package created successfully" }); }}>
              Create Package
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
