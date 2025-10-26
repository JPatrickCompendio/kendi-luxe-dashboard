import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UserPlus } from "lucide-react";

const mockStaff = [
  { id: 1, name: "Dr. Maria Santos", role: "Doctor", contact: "0917-111-2222", schedule: "Mon-Fri, 9AM-5PM", appointments: 45, rating: 4.8, status: "Active" },
  { id: 2, name: "Ana Reyes", role: "Aesthetician", contact: "0918-222-3333", schedule: "Mon-Sat, 10AM-6PM", appointments: 38, rating: 4.9, status: "Active" },
  { id: 3, name: "Carlos Gomez", role: "Staff", contact: "0919-333-4444", schedule: "Tue-Sun, 9AM-5PM", appointments: 12, rating: 4.5, status: "Active" },
];

export default function Staff() {
  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-heading font-bold text-foreground mb-2">Doctors & Staff</h1>
          <p className="text-muted-foreground">Manage your clinic's medical professionals and staff.</p>
        </div>
        <Button className="gap-2">
          <UserPlus className="w-4 h-4" />
          Add Staff
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Schedule</TableHead>
              <TableHead>Appointments</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockStaff.map((staff) => (
              <TableRow key={staff.id}>
                <TableCell className="font-medium">{staff.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{staff.role}</Badge>
                </TableCell>
                <TableCell>{staff.contact}</TableCell>
                <TableCell>{staff.schedule}</TableCell>
                <TableCell>{staff.appointments}</TableCell>
                <TableCell>⭐ {staff.rating}</TableCell>
                <TableCell>
                  <Badge>{staff.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
