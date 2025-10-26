import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Edit, Trash2, Database, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockUsers = [
  { id: 1, name: "Admin User", email: "admin@kendi.com", role: "Administrator", status: "Active", lastLogin: "2025-01-20" },
  { id: 2, name: "Dr. Santos", email: "santos@kendi.com", role: "Doctor", status: "Active", lastLogin: "2025-01-19" },
  { id: 3, name: "Receptionist A", email: "reception@kendi.com", role: "Staff", status: "Active", lastLogin: "2025-01-20" },
  { id: 4, name: "Manager B", email: "manager@kendi.com", role: "Manager", status: "Active", lastLogin: "2025-01-18" },
];

const mockActivityLog = [
  { id: 1, user: "Admin User", action: "Updated client record", timestamp: "2025-01-20 10:30 AM" },
  { id: 2, user: "Dr. Santos", action: "Added appointment", timestamp: "2025-01-20 09:15 AM" },
  { id: 3, user: "Manager B", action: "Generated report", timestamp: "2025-01-19 04:45 PM" },
  { id: 4, user: "Receptionist A", action: "Processed payment", timestamp: "2025-01-19 02:20 PM" },
];

export default function Settings() {
  const { toast } = useToast();
  const [users, setUsers] = useState(mockUsers);
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [editUserDialogOpen, setEditUserDialogOpen] = useState(false);
  const [deleteUserDialogOpen, setDeleteUserDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const handleDeleteUser = () => {
    setUsers(users.filter(u => u.id !== selectedUser?.id));
    setDeleteUserDialogOpen(false);
    toast({ title: "User deleted successfully" });
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-4xl font-heading font-bold">System Settings</h1>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="clinic">Clinic Info</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-heading font-semibold">Manage Users</h2>
            <Button onClick={() => setAddUserDialogOpen(true)}>
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>

          <Card className="p-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Badge variant="default">{user.status}</Badge>
                    </TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedUser(user);
                            setEditUserDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            setSelectedUser(user);
                            setDeleteUserDialogOpen(true);
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
        </TabsContent>

        <TabsContent value="clinic" className="space-y-6">
          <h2 className="text-2xl font-heading font-semibold">Clinic Information</h2>
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <Label>Clinic Name</Label>
                <Input defaultValue="KENDI Beauty Lounge & Wellness" />
              </div>
              <div>
                <Label>Address</Label>
                <Textarea defaultValue="123 Main Street, Baliuag, Bulacan" rows={3} />
              </div>
              <div>
                <Label>Contact Number</Label>
                <Input defaultValue="+63 917 123 4567" />
              </div>
              <div>
                <Label>Email</Label>
                <Input defaultValue="info@kendi.com" />
              </div>
              <div>
                <Label>Operating Hours</Label>
                <Textarea defaultValue="Monday - Saturday: 9:00 AM - 7:00 PM&#10;Sunday: Closed" rows={2} />
              </div>
              <Button>Save Changes</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <h2 className="text-2xl font-heading font-semibold">System Configuration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Database className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="text-lg font-semibold">Backup & Restore</h3>
                  <p className="text-sm text-muted-foreground">Manage system backups</p>
                </div>
              </div>
              <div className="space-y-2">
                <Button variant="outline" className="w-full" onClick={() => toast({ title: "Backup started" })}>
                  Create Backup
                </Button>
                <Button variant="outline" className="w-full" onClick={() => toast({ title: "Restore initiated" })}>
                  Restore from Backup
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Shield className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="text-lg font-semibold">Security Settings</h3>
                  <p className="text-sm text-muted-foreground">Configure access controls</p>
                </div>
              </div>
              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  Reset Admin Password
                </Button>
                <Button variant="outline" className="w-full">
                  Configure Permissions
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <h2 className="text-2xl font-heading font-semibold">Activity Log</h2>
          <Card className="p-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockActivityLog.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-medium">{log.user}</TableCell>
                    <TableCell>{log.action}</TableCell>
                    <TableCell>{log.timestamp}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add User Dialog */}
      <Dialog open={addUserDialogOpen} onOpenChange={setAddUserDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input placeholder="Enter name" />
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" placeholder="Enter email" />
            </div>
            <div>
              <Label>Role</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Administrator">Administrator</SelectItem>
                  <SelectItem value="Doctor">Doctor</SelectItem>
                  <SelectItem value="Staff">Staff</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Password</Label>
              <Input type="password" placeholder="Enter password" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddUserDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => { setAddUserDialogOpen(false); toast({ title: "User added successfully" }); }}>
              Add User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={editUserDialogOpen} onOpenChange={setEditUserDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input defaultValue={selectedUser?.name} />
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" defaultValue={selectedUser?.email} />
            </div>
            <div>
              <Label>Role</Label>
              <Select defaultValue={selectedUser?.role}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Administrator">Administrator</SelectItem>
                  <SelectItem value="Doctor">Doctor</SelectItem>
                  <SelectItem value="Staff">Staff</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditUserDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => { setEditUserDialogOpen(false); toast({ title: "User updated successfully" }); }}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={deleteUserDialogOpen} onOpenChange={setDeleteUserDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete {selectedUser?.name}? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteUserDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteUser}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
