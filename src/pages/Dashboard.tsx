import { useState } from "react";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { Calendar, Users, DollarSign, Stethoscope } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

const COLORS = ["hsl(45, 65%, 52%)", "hsl(14, 26%, 70%)", "hsl(0, 56%, 90%)", "hsl(0, 0%, 60%)"];

export default function Dashboard() {
  const [branch, setBranch] = useState("baliuag");
  const [timeRange, setTimeRange] = useState("monthly");

  // Mock data that changes based on branch
  const summaryData = {
    baliuag: {
      appointments: 142,
      clients: 89,
      income: "₱248,500",
      staff: 8,
    },
    malolos: {
      appointments: 98,
      clients: 67,
      income: "₱189,300",
      staff: 6,
    },
  };

  const servicesData = {
    baliuag: [
      { name: "Facial Treatment", value: 35 },
      { name: "Body Slimming", value: 28 },
      { name: "Vitamin Drip", value: 22 },
      { name: "Other Services", value: 15 },
    ],
    malolos: [
      { name: "Facial Treatment", value: 40 },
      { name: "Body Slimming", value: 25 },
      { name: "Vitamin Drip", value: 20 },
      { name: "Other Services", value: 15 },
    ],
  };

  const incomeData = {
    baliuag: [
      { month: "Jan", income: 45000 },
      { month: "Feb", income: 52000 },
      { month: "Mar", income: 48000 },
      { month: "Apr", income: 61000 },
      { month: "May", income: 55000 },
      { month: "Jun", income: 58000 },
    ],
    malolos: [
      { month: "Jan", income: 32000 },
      { month: "Feb", income: 38000 },
      { month: "Mar", income: 35000 },
      { month: "Apr", income: 42000 },
      { month: "May", income: 39000 },
      { month: "Jun", income: 41000 },
    ],
  };

  const appointmentTrends = {
    baliuag: [
      { day: "Mon", count: 24 },
      { day: "Tue", count: 28 },
      { day: "Wed", count: 22 },
      { day: "Thu", count: 30 },
      { day: "Fri", count: 26 },
      { day: "Sat", count: 35 },
      { day: "Sun", count: 18 },
    ],
    malolos: [
      { day: "Mon", count: 18 },
      { day: "Tue", count: 22 },
      { day: "Wed", count: 16 },
      { day: "Thu", count: 24 },
      { day: "Fri", count: 20 },
      { day: "Sat", count: 28 },
      { day: "Sun", count: 14 },
    ],
  };

  const currentBranch = branch as "baliuag" | "malolos";
  const data = summaryData[currentBranch];

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-heading font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Admin! Here's your clinic overview.</p>
        </div>

        <div className="flex gap-3">
          <Select value={branch} onValueChange={setBranch}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="baliuag">Baliuag Branch</SelectItem>
              <SelectItem value="malolos">Malolos Branch</SelectItem>
            </SelectContent>
          </Select>

          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <SummaryCard
          title="Total Appointments"
          value={data.appointments}
          icon={Calendar}
          trend="+12% from last month"
          trendUp
        />
        <SummaryCard
          title="Total Clients"
          value={data.clients}
          icon={Users}
          trend="+8% from last month"
          trendUp
        />
        <SummaryCard
          title="Total Income"
          value={data.income}
          icon={DollarSign}
          trend="+15% from last month"
          trendUp
        />
        <SummaryCard
          title="Active Staff"
          value={data.staff}
          icon={Stethoscope}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Most Availed Services */}
        <Card className="p-6">
          <h3 className="text-xl font-heading font-semibold mb-6">Most Availed Services</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={servicesData[currentBranch]}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {servicesData[currentBranch].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Income Summary */}
        <Card className="p-6">
          <h3 className="text-xl font-heading font-semibold mb-6">Income Summary</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={incomeData[currentBranch]}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="income"
                stroke="hsl(45, 65%, 52%)"
                strokeWidth={3}
                dot={{ fill: "hsl(45, 65%, 52%)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Appointment Trends */}
      <Card className="p-6 mb-8">
        <h3 className="text-xl font-heading font-semibold mb-6">Appointment Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={appointmentTrends[currentBranch]}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip />
            <Bar dataKey="count" fill="hsl(14, 26%, 70%)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Recent Activity */}
      <Card className="p-6">
        <h3 className="text-xl font-heading font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { action: "New appointment booked", client: "Maria Santos", time: "2 minutes ago" },
            { action: "Payment received", client: "Juan Dela Cruz", time: "15 minutes ago" },
            { action: "Feedback submitted", client: "Ana Reyes", time: "1 hour ago" },
            { action: "Service completed", client: "Sofia Martinez", time: "2 hours ago" },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <div>
                <p className="font-medium text-foreground">{activity.action}</p>
                <p className="text-sm text-muted-foreground">{activity.client}</p>
              </div>
              <span className="text-sm text-muted-foreground">{activity.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
