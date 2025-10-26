import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Filter, Eye, Edit, Trash2, UserPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const mockClients = [
  { id: 1, name: "Maria Santos", contact: "0917-123-4567", lastVisit: "2024-10-20", appointments: 12, status: "Active", branch: "baliuag" },
  { id: 2, name: "Juan Dela Cruz", contact: "0918-234-5678", lastVisit: "2024-10-18", appointments: 8, status: "Active", branch: "baliuag" },
  { id: 3, name: "Ana Reyes", contact: "0919-345-6789", lastVisit: "2024-09-15", appointments: 5, status: "Inactive", branch: "malolos" },
  { id: 4, name: "Sofia Martinez", contact: "0920-456-7890", lastVisit: "2024-10-22", appointments: 15, status: "Active", branch: "malolos" },
  { id: 5, name: "Carlos Gomez", contact: "0921-567-8901", lastVisit: "2024-10-19", appointments: 6, status: "Active", branch: "baliuag" },
];

export default function Clients() {
  const [branch, setBranch] = useState("all");
  const [status, setStatus] = useState("all");
  const [selectedClient, setSelectedClient] = useState<any>(null);

  const filteredClients = mockClients.filter(client => {
    if (branch !== "all" && client.branch !== branch) return false;
    if (status !== "all" && client.status.toLowerCase() !== status) return false;
    return true;
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-heading font-bold text-foreground mb-2">Client Management</h1>
        <p className="text-muted-foreground">Manage all registered clients and their information.</p>
      </div>

      {/* Filters and Actions */}
      <Card className="p-6 mb-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search clients..." className="pl-10" />
            </div>
            
            <Select value={branch} onValueChange={setBranch}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Branches</SelectItem>
                <SelectItem value="baliuag">Baliuag</SelectItem>
                <SelectItem value="malolos">Malolos</SelectItem>
              </SelectContent>
            </Select>

            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="gap-2">
            <UserPlus className="w-4 h-4" />
            Add Client
          </Button>
        </div>
      </Card>

      {/* Clients Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact Info</TableHead>
              <TableHead>Last Visit</TableHead>
              <TableHead>Appointments</TableHead>
              <TableHead>Branch</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell>{client.contact}</TableCell>
                <TableCell>{client.lastVisit}</TableCell>
                <TableCell>{client.appointments}</TableCell>
                <TableCell className="capitalize">{client.branch}</TableCell>
                <TableCell>
                  <Badge variant={client.status === "Active" ? "default" : "secondary"}>
                    {client.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedClient(client)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Client Profile Modal */}
      {selectedClient && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-card p-8 rounded-2xl shadow-gold max-w-2xl w-full mx-4 border border-primary/20">
            <h3 className="text-2xl font-heading font-semibold mb-6">Client Profile</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{selectedClient.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Contact</p>
                  <p className="font-medium">{selectedClient.contact}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Visit</p>
                  <p className="font-medium">{selectedClient.lastVisit}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Appointments</p>
                  <p className="font-medium">{selectedClient.appointments}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Branch</p>
                  <p className="font-medium capitalize">{selectedClient.branch}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge variant={selectedClient.status === "Active" ? "default" : "secondary"}>
                    {selectedClient.status}
                  </Badge>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <h4 className="font-semibold mb-3">Appointment History</h4>
                <div className="space-y-2 text-sm">
                  <p>• Facial Treatment - October 20, 2024</p>
                  <p>• Body Slimming - October 15, 2024</p>
                  <p>• Vitamin Drip - October 10, 2024</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-end mt-6">
              <Button variant="outline" onClick={() => setSelectedClient(null)}>
                Close
              </Button>
              <Button>Edit Profile</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
