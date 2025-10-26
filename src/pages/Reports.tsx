import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Download } from "lucide-react";
import { ExportReportModal } from "@/components/ExportReportModal";

const COLORS = ["#C4A69F", "#D4AF37", "#F7D4D4", "#EDEDED"];

const incomeData = {
  Baliuag: [
    { month: "Jan", income: 125000 },
    { month: "Feb", income: 142000 },
    { month: "Mar", income: 138000 },
    { month: "Apr", income: 155000 },
  ],
  Malolos: [
    { month: "Jan", income: 98000 },
    { month: "Feb", income: 112000 },
    { month: "Mar", income: 105000 },
    { month: "Apr", income: 128000 },
  ],
};

const appointmentData = {
  Baliuag: [
    { month: "Jan", appointments: 145 },
    { month: "Feb", appointments: 168 },
    { month: "Mar", appointments: 152 },
    { month: "Apr", appointments: 180 },
  ],
  Malolos: [
    { month: "Jan", appointments: 98 },
    { month: "Feb", appointments: 112 },
    { month: "Mar", appointments: 105 },
    { month: "Apr", appointments: 135 },
  ],
};

const serviceData = {
  Baliuag: [
    { name: "Facial", value: 35 },
    { name: "Slimming", value: 25 },
    { name: "Drip", value: 20 },
    { name: "Wellness", value: 20 },
  ],
  Malolos: [
    { name: "Facial", value: 40 },
    { name: "Slimming", value: 22 },
    { name: "Drip", value: 18 },
    { name: "Wellness", value: 20 },
  ],
};

const staffPerformance = {
  Baliuag: [
    { name: "Dr. Santos", appointments: 85, rating: 4.8 },
    { name: "Dr. Reyes", appointments: 72, rating: 4.6 },
    { name: "Aesthetician Cruz", appointments: 95, rating: 4.9 },
  ],
  Malolos: [
    { name: "Dr. Garcia", appointments: 68, rating: 4.7 },
    { name: "Dr. Torres", appointments: 55, rating: 4.5 },
    { name: "Aesthetician Lopez", appointments: 78, rating: 4.8 },
  ],
};

const feedbackRatings = {
  Baliuag: [
    { rating: "5 Stars", value: 65 },
    { rating: "4 Stars", value: 25 },
    { rating: "3 Stars", value: 7 },
    { rating: "2 Stars", value: 2 },
    { rating: "1 Star", value: 1 },
  ],
  Malolos: [
    { rating: "5 Stars", value: 58 },
    { rating: "4 Stars", value: 28 },
    { rating: "3 Stars", value: 10 },
    { rating: "2 Stars", value: 3 },
    { rating: "1 Star", value: 1 },
  ],
};

export default function Reports() {
  const [branch, setBranch] = useState<"Baliuag" | "Malolos">("Baliuag");
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [reportType, setReportType] = useState("");

  const currentIncomeData = incomeData[branch];
  const currentAppointmentData = appointmentData[branch];
  const currentServiceData = serviceData[branch];
  const currentStaffData = staffPerformance[branch];
  const currentFeedbackData = feedbackRatings[branch];

  const totalIncome = currentIncomeData.reduce((sum, d) => sum + d.income, 0);
  const totalAppointments = currentAppointmentData.reduce((sum, d) => sum + d.appointments, 0);
  const topService = currentServiceData.reduce((max, s) => s.value > max.value ? s : max, currentServiceData[0]);
  const topStaff = currentStaffData.reduce((max, s) => s.rating > max.rating ? s : max, currentStaffData[0]);

  const handleExport = (type: string) => {
    setReportType(type);
    setExportModalOpen(true);
  };

  const getExportData = () => {
    switch (reportType) {
      case "income":
        return currentIncomeData.map(d => ({ Month: d.month, Income: `₱${d.income.toLocaleString()}`, Branch: branch }));
      case "appointments":
        return currentAppointmentData.map(d => ({ Month: d.month, Appointments: d.appointments, Branch: branch }));
      case "services":
        return currentServiceData.map(d => ({ Service: d.name, Percentage: `${d.value}%`, Branch: branch }));
      case "staff":
        return currentStaffData.map(d => ({ Staff: d.name, Appointments: d.appointments, Rating: d.rating, Branch: branch }));
      case "feedback":
        return currentFeedbackData.map(d => ({ Rating: d.rating, Count: d.value, Percentage: `${d.value}%`, Branch: branch }));
      case "user-management":
        return [
          { User: "Admin User", Role: "Administrator", Status: "Active", Last_Login: "2025-01-20", Branch: branch },
          { User: "Dr. Santos", Role: "Doctor", Status: "Active", Last_Login: "2025-01-19", Branch: branch },
          { User: "Receptionist A", Role: "Staff", Status: "Active", Last_Login: "2025-01-20", Branch: branch },
          { User: "Manager B", Role: "Manager", Status: "Active", Last_Login: "2025-01-18", Branch: branch },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-heading font-bold">Reports & Analytics</h1>
        <Select value={branch} onValueChange={(v) => setBranch(v as "Baliuag" | "Malolos")}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Baliuag">Baliuag Branch</SelectItem>
            <SelectItem value="Malolos">Malolos Branch</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Total Appointments</p>
          <p className="text-3xl font-bold text-primary">{totalAppointments}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Total Income</p>
          <p className="text-3xl font-bold text-gold">₱{totalIncome.toLocaleString()}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Top Service</p>
          <p className="text-3xl font-bold">{topService.name}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Top Staff</p>
          <p className="text-lg font-bold">{topStaff.name}</p>
          <p className="text-sm text-muted-foreground">Rating: {topStaff.rating}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-heading font-semibold">Monthly Income</h3>
            <Button size="sm" variant="outline" onClick={() => handleExport("income")}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={currentIncomeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="#D4AF37" strokeWidth={2} name="Income (₱)" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-heading font-semibold">Appointment Trends</h3>
            <Button size="sm" variant="outline" onClick={() => handleExport("appointments")}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={currentAppointmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="appointments" fill="#C4A69F" name="Appointments" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-heading font-semibold">Most Availed Services</h3>
            <Button size="sm" variant="outline" onClick={() => handleExport("services")}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={currentServiceData} cx="50%" cy="50%" labelLine={false} label={(entry) => `${entry.name}: ${entry.value}%`} outerRadius={100} fill="#8884d8" dataKey="value">
                {currentServiceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-heading font-semibold">Staff Performance</h3>
            <Button size="sm" variant="outline" onClick={() => handleExport("staff")}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={currentStaffData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="appointments" fill="#C4A69F" name="Appointments" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-heading font-semibold">Feedback Rating Summary</h3>
            <Button size="sm" variant="outline" onClick={() => handleExport("feedback")}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={currentFeedbackData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} fill="#8884d8" paddingAngle={5} dataKey="value" label={(entry) => `${entry.rating}: ${entry.value}%`}>
                {currentFeedbackData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-heading font-semibold">User Management Report</h3>
            <Button size="sm" variant="outline" onClick={() => handleExport("user-management")}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
          <p className="text-muted-foreground">Export detailed user access, roles, and activity logs.</p>
        </Card>
      </div>

      <ExportReportModal
        open={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        reportType={reportType === "user-management" ? "User Management Report" : `${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report`}
        branch={branch}
        data={getExportData()}
        totals={reportType === "income" ? { total_income: `₱${totalIncome.toLocaleString()}` } : undefined}
      />
    </div>
  );
}
