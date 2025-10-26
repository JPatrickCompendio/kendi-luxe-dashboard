import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Star, MessageSquare, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockFeedback = [
  { id: 1, client: "Maria Santos", doctor: "Dr. Santos", service: "Diamond Peel Facial", rating: 5, comment: "Excellent service! Very professional and caring.", date: "2025-01-15", status: "Resolved" },
  { id: 2, client: "Anna Cruz", doctor: "Aesthetician Cruz", service: "Cavitation Slimming", rating: 4, comment: "Good results but took longer than expected.", date: "2025-01-16", status: "Pending" },
  { id: 3, client: "Sofia Garcia", doctor: "Dr. Reyes", service: "Glutathione IV Drip", rating: 5, comment: "Amazing experience! Will definitely come back.", date: "2025-01-17", status: "Resolved" },
  { id: 4, client: "Isabella Reyes", doctor: "Dr. Garcia", service: "Hydrating Glow Facial", rating: 3, comment: "Service was okay, but the waiting area was crowded.", date: "2025-01-18", status: "Pending" },
  { id: 5, client: "Gabriela Torres", doctor: "Dr. Santos", service: "RF Body Contouring", rating: 5, comment: "Outstanding results! Highly recommend.", date: "2025-01-19", status: "Resolved" },
  { id: 6, client: "Valentina Lopez", doctor: "Aesthetician Lopez", service: "Vitamin C Booster Drip", rating: 4, comment: "Great staff, very friendly and knowledgeable.", date: "2025-01-20", status: "Pending" },
  { id: 7, client: "Camila Mendoza", doctor: "Dr. Torres", service: "Full Body Massage", rating: 5, comment: "So relaxing! Best massage I've ever had.", date: "2025-01-21", status: "Resolved" },
  { id: 8, client: "Lucia Ramirez", doctor: "Dr. Santos", service: "Anti-Aging Facial", rating: 2, comment: "Not satisfied with the results, expected more.", date: "2025-01-22", status: "Pending" },
];

export default function Feedback() {
  const { toast } = useToast();
  const [feedbackList, setFeedbackList] = useState(mockFeedback);
  const [doctorFilter, setDoctorFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null);

  const filteredFeedback = feedbackList.filter((fb) => {
    const matchesDoctor = doctorFilter === "all" || fb.doctor === doctorFilter;
    const matchesService = serviceFilter === "all" || fb.service === serviceFilter;
    const matchesStatus = statusFilter === "all" || fb.status === statusFilter;
    const matchesSearch = fb.client.toLowerCase().includes(searchQuery.toLowerCase()) || fb.comment.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDoctor && matchesService && matchesStatus && matchesSearch;
  });

  const averageRating = (filteredFeedback.reduce((sum, fb) => sum + fb.rating, 0) / filteredFeedback.length).toFixed(1);

  const handleResolve = () => {
    setFeedbackList(feedbackList.map(fb => 
      fb.id === selectedFeedback?.id ? { ...fb, status: "Resolved" } : fb
    ));
    setReplyDialogOpen(false);
    toast({ title: "Feedback resolved successfully" });
  };

  const handleDelete = () => {
    setFeedbackList(feedbackList.filter(fb => fb.id !== selectedFeedback?.id));
    setDeleteDialogOpen(false);
    toast({ title: "Feedback deleted successfully" });
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-4xl font-heading font-bold">Feedback Management</h1>

      <Card className="p-6 bg-gradient-subtle">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Average Satisfaction Rating</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <p className="text-4xl font-bold text-gold">{averageRating}</p>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-6 w-6 ${i < Math.round(parseFloat(averageRating)) ? "fill-gold text-gold" : "text-muted"}`} />
              ))}
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">Based on {filteredFeedback.length} reviews</p>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex flex-wrap gap-4 mb-6">
          <Input
            placeholder="Search feedback..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-xs"
          />
          <Select value={doctorFilter} onValueChange={setDoctorFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Doctor/Staff" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Staff</SelectItem>
              <SelectItem value="Dr. Santos">Dr. Santos</SelectItem>
              <SelectItem value="Dr. Reyes">Dr. Reyes</SelectItem>
              <SelectItem value="Dr. Garcia">Dr. Garcia</SelectItem>
              <SelectItem value="Aesthetician Cruz">Aesthetician Cruz</SelectItem>
            </SelectContent>
          </Select>
          <Select value={serviceFilter} onValueChange={setServiceFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              <SelectItem value="Diamond Peel Facial">Diamond Peel Facial</SelectItem>
              <SelectItem value="Cavitation Slimming">Cavitation Slimming</SelectItem>
              <SelectItem value="Glutathione IV Drip">Glutathione IV Drip</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Doctor/Staff</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Comment</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFeedback.map((fb) => (
              <TableRow key={fb.id}>
                <TableCell className="font-medium">{fb.client}</TableCell>
                <TableCell>{fb.doctor}</TableCell>
                <TableCell>{fb.service}</TableCell>
                <TableCell>
                  <div className="flex">
                    {[...Array(fb.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                    ))}
                  </div>
                </TableCell>
                <TableCell className="max-w-xs truncate">{fb.comment}</TableCell>
                <TableCell>{fb.date}</TableCell>
                <TableCell>
                  <Badge variant={fb.status === "Resolved" ? "default" : "secondary"}>
                    {fb.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedFeedback(fb);
                        setReplyDialogOpen(true);
                      }}
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        setSelectedFeedback(fb);
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

      {/* Reply Dialog */}
      <Dialog open={replyDialogOpen} onOpenChange={setReplyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reply to Feedback</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium">Client: {selectedFeedback?.client}</p>
              <p className="text-sm text-muted-foreground">Service: {selectedFeedback?.service}</p>
              <p className="text-sm text-muted-foreground">Comment: {selectedFeedback?.comment}</p>
            </div>
            <div>
              <Textarea placeholder="Type your reply here..." rows={4} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReplyDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleResolve}>Send & Resolve</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Feedback</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this feedback? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
