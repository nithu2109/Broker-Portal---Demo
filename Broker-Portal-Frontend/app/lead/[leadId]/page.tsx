"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Plus } from "lucide-react";
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import LeadDetailsPage from "@/features/lead/view/LeadDetailsPage";
import CancelLeadModal from "@/components/lead/CancelLeadModal";
import { ROUTES } from "@/lib/constants";

export default function LeadDetailRoute() {
  const router = useRouter();
  const params = useParams();
  const leadId = params.leadId as string;
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleCancelLead = () => {
    // TODO: Call API to cancel the lead
    console.log("Cancelling lead:", leadId);
    // Redirect back to leads list
    router.push(ROUTES.viewLeads);
  };



  return (
    <>
      <DashboardLayout>
        <div style={{ padding: "24px" }}>
          <LeadDetailsPage leadId={leadId} />
        </div>
      </DashboardLayout>

      <CancelLeadModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleCancelLead}
      />
    </>
  );
}
