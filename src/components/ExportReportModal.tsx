import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";

interface ExportReportModalProps {
  open: boolean;
  onClose: () => void;
  reportType: string;
  branch: string;
  data: Array<Record<string, any>>;
  totals?: Record<string, any>;
}

export const ExportReportModal = ({ open, onClose, reportType, branch, data, totals }: ExportReportModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto border-gold">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl text-center">
            KENDI Beauty Lounge & Wellness
          </DialogTitle>
          <p className="text-center text-muted-foreground font-medium">
            {reportType} — {branch} Branch
          </p>
        </DialogHeader>

        <div className="space-y-4">
          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-accent">
                  <tr>
                    {data.length > 0 && Object.keys(data[0]).map((key) => (
                      <th key={key} className="px-4 py-3 text-left text-sm font-semibold capitalize">
                        {key.replace(/_/g, ' ')}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, idx) => (
                    <tr key={idx} className="border-t hover:bg-accent/50">
                      {Object.values(row).map((value, i) => (
                        <td key={i} className="px-4 py-3 text-sm">
                          {String(value)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {totals && (
            <div className="bg-accent p-4 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(totals).map(([key, value]) => (
                  <div key={key}>
                    <p className="text-sm text-muted-foreground capitalize">
                      {key.replace(/_/g, ' ')}
                    </p>
                    <p className="text-lg font-semibold">{String(value)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            <X className="mr-2 h-4 w-4" />
            Close
          </Button>
          <Button onClick={() => alert("PDF download simulated!")}>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
