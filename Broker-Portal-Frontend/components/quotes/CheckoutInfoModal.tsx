"use client";

import React, { useState } from "react";
import { X, Lock } from "lucide-react";

interface CheckoutInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  companyName: string;
  quoteId: string;
}

export default function CheckoutInfoModal({
  isOpen,
  onClose,
  onNext,
  companyName,
  quoteId,
}: CheckoutInfoModalProps) {
  const [authorised, setAuthorised] = useState<string>("Yes");
  const [isDirector, setIsDirector] = useState<string>("Yes");
  const [businessType, setBusinessType] = useState<string>("");
  const [acknowledged, setAcknowledged] = useState<boolean>(false);
  const [bank, setBank] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [accountType, setAccountType] = useState<string>("Cheque");
  const [debitDay, setDebitDay] = useState<string>("25");

  if (!isOpen) return null;

  const handleDownloadQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    // Simple alert/toast feedback for demonstration
    alert(`Downloading official quote document for ${quoteId}...`);
  };

  const isFormValid =
    authorised !== "" &&
    isDirector !== "" &&
    businessType !== "" &&
    acknowledged &&
    bank !== "" &&
    accountNumber.trim() !== "" &&
    accountType !== "" &&
    debitDay !== "";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: "rgba(11, 11, 11, 0.72)",
        backdropFilter: "blur(10.5px)",
      }}
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className="flex flex-col w-full max-w-[620px] max-h-[90vh] rounded-[10px] overflow-hidden shadow-2xl relative"
        style={{
          background: "#1E1E1E",
          border: "0.625px solid #4A4A4A",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fixed Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#3A3A3A] bg-[#1E1E1E] z-10 flex-shrink-0">
          <div>
            <p className="text-[10px] font-bold tracking-widest text-[#A0A0A0] uppercase text-center sm:text-left">
              CHECK OUT
            </p>
            <h2 className="text-base font-bold text-white mt-0.5">
              Policy Servicing & Payment
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-[#2A2A2A] transition-colors"
          >
            <X size={20} color="#E3E3E3" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8 custom-scrollbar">
          {/* Main Title Area */}
          <div className="text-center space-y-1.5 max-w-md mx-auto">
            <h3 className="text-xl font-bold text-white leading-tight">
              Lastly, we need some info for policy servicing and payment
            </h3>
            <p className="text-sm text-[#A0A0A0]">
              Please ensure the info is accurate
            </p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1 max-w-md mx-auto">
            <div className="w-full h-7 bg-[#2D2D2D] rounded-md overflow-hidden flex relative items-center border border-[#3A3A3A]">
              <div
                className="h-full bg-[#1FC3EB] transition-all duration-500 flex items-center justify-center"
                style={{ width: "80%" }}
              >
                <span className="text-xs font-bold text-[#0A0A0A] px-2 absolute left-1/2 -translate-x-1/2">
                  80%
                </span>
              </div>
            </div>
          </div>

          {/* Question 1: Authorised */}
          <div className="space-y-3 pt-2">
            <label className="text-sm font-medium text-white block">
              Are you authorised to act on behalf of the organisation?
            </label>
            <div className="flex flex-col gap-2.5">
              {["Yes", "No"].map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="authorised"
                    value={opt}
                    checked={authorised === opt}
                    onChange={(e) => setAuthorised(e.target.value)}
                    className="w-4 h-4 accent-[#1FC3EB] cursor-pointer bg-[#262626] border-[#4A4A4A]"
                  />
                  <span className="text-sm text-[#E6E6E6] group-hover:text-white transition-colors">
                    {opt}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Section: Your Details */}
          <div className="space-y-3 pt-2 border-t border-[#2D2D2D]">
            <h4 className="text-base font-bold text-[#1FC3EB]">Your Details</h4>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white block">
                Are you a director or member of the organisation?
              </label>
              <div className="flex flex-col gap-2.5">
                {["Yes", "No"].map((opt) => (
                  <label
                    key={opt}
                    className="flex items-center gap-2 cursor-pointer group"
                  >
                    <input
                      type="radio"
                      name="isDirector"
                      value={opt}
                      checked={isDirector === opt}
                      onChange={(e) => setIsDirector(e.target.value)}
                      className="w-4 h-4 accent-[#1FC3EB] cursor-pointer bg-[#262626] border-[#4A4A4A]"
                    />
                    <span className="text-sm text-[#E6E6E6] group-hover:text-white transition-colors">
                      {opt}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Section: Organisation details */}
          <div className="space-y-4 pt-2 border-t border-[#2D2D2D]">
            <h4 className="text-base font-bold text-[#1FC3EB]">
              Organisation details
            </h4>
            <p className="text-xs text-[#EF4444] font-medium leading-relaxed bg-[rgba(239,68,68,0.05)] p-2.5 rounded border border-[rgba(239,68,68,0.15)]">
              If you cannot fill in the information required in this section, please call us on 021 045 1448
            </p>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white block">
                What kind of business is this?
              </label>
              <select
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="w-full h-11 bg-[#262626] border border-[#4A4A4A] rounded-lg px-4 text-sm text-white focus:border-[#1FC3EB] focus:outline-none transition-colors cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%239CA3AF' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 16px center",
                  appearance: "none",
                }}
              >
                <option value="" disabled className="text-[#A0A0A0]">
                  Please select
                </option>
                <option value="Sole Proprietor">Sole Proprietor</option>
                <option value="Private Company (Pty) Ltd">
                  Private Company (Pty) Ltd
                </option>
                <option value="Public Company (Ltd)">
                  Public Company (Ltd)
                </option>
                <option value="Close Corporation (CC)">
                  Close Corporation (CC)
                </option>
                <option value="Partnership">Partnership</option>
                <option value="Trust">Trust</option>
                <option value="Non-Profit Organisation (NPO)">
                  Non-Profit Organisation (NPO)
                </option>
              </select>
            </div>
          </div>

          {/* Section: Payment details */}
          <div className="space-y-5 pt-2 border-t border-[#2D2D2D]">
            <h4 className="text-base font-bold text-[#1FC3EB]">
              Payment details
            </h4>
            
            {/* Legal / Mandate Text */}
            <div className="space-y-3 text-xs text-[#D4D4D4] leading-relaxed bg-[#252525] p-4 rounded-lg border border-[#353535]">
              <p>
                I authorise By checking the box below, you authorise to deduct the monthly premium of Itand Mutual Assurance from{" "}
                <strong className="text-white font-semibold">
                  {companyName || "the organisation"}
                </strong>
                's bank account (details below), on condition the amount deducted never exceeds the amount committed to under this policy. This mandate will commence on the debit order date selected below and will continue monthly thereafter until it is terminated by giving not less than one month's notice. The reference number for the deduction will be Company combined with my policy number.
              </p>
              <p>
                In the event the payment day falls on a Sunday, or recognised South African public holiday, the payment day will automatically be the preceding ordinary business day. If there are insufficient funds in the nominated account to meet the obligation, you are entitled to track my account and re-present the instruction for payment as soon as sufficient funds are available in my account.
              </p>
              <p>
                I agree that cancelling this mandate will not cancel the agreement, and that I will not be entitled to any refund of amounts which you have withdrawn while this Authority was in force, if such amounts were legally owing to you. I also acknowledge that this Authority may only be ceded or assigned to a third party if the Agreement is also ceded or assigned to that third party.
              </p>
            </div>

            {/* Acknowledge Checkbox */}
            <label className="flex items-start gap-3 cursor-pointer group pt-1">
              <input
                type="checkbox"
                checked={acknowledged}
                onChange={(e) => setAcknowledged(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-[#1FC3EB] rounded cursor-pointer bg-[#262626] border-[#4A4A4A]"
              />
              <span className="text-sm font-medium text-[#E6E6E6] group-hover:text-white transition-colors">
                Acknowledge
              </span>
            </label>

            {/* Form Fields Grid */}
            <div className="space-y-4 pt-2">
              {/* Bank Selection */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-white block">
                  Bank
                </label>
                <select
                  value={bank}
                  onChange={(e) => setBank(e.target.value)}
                  className="w-full h-11 bg-[#262626] border border-[#4A4A4A] rounded-lg px-4 text-sm text-white focus:border-[#1FC3EB] focus:outline-none transition-colors cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%239CA3AF' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 16px center",
                    appearance: "none",
                  }}
                >
                  <option value="" disabled className="text-[#A0A0A0]">
                    Please select
                  </option>
                  <option value="ABSA">ABSA</option>
                  <option value="Capitec">Capitec</option>
                  <option value="First National Bank (FNB)">
                    First National Bank (FNB)
                  </option>
                  <option value="Nedbank">Nedbank</option>
                  <option value="Standard Bank">Standard Bank</option>
                  <option value="Discovery Bank">Discovery Bank</option>
                  <option value="TymeBank">TymeBank</option>
                </select>
              </div>

              {/* Bank Account Number */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-white block">
                  Bank account number
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]">
                    <Lock size={16} />
                  </div>
                  <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ""))}
                    placeholder="Enter account number"
                    className="w-full h-11 pl-9 pr-4 bg-[#262626] border border-[#4A4A4A] rounded-lg text-sm text-white placeholder:text-[#888888] focus:border-[#1FC3EB] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Bank Account Type */}
              <div className="space-y-2.5 pt-1">
                <label className="text-sm font-medium text-white block">
                  Bank account type
                </label>
                <div className="flex flex-col gap-2.5">
                  {["Cheque", "Current", "Savings", "Transmission"].map(
                    (type) => (
                      <label
                        key={type}
                        className="flex items-center gap-2 cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name="accountType"
                          value={type}
                          checked={accountType === type}
                          onChange={(e) => setAccountType(e.target.value)}
                          className="w-4 h-4 accent-[#1FC3EB] cursor-pointer bg-[#262626] border-[#4A4A4A]"
                        />
                        <span className="text-sm text-[#E6E6E6] group-hover:text-white transition-colors">
                          {type}
                        </span>
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Debit Day Selection */}
              <div className="space-y-1.5 pt-1">
                <label className="text-sm font-medium text-white block">
                  Which day of the month should we debit the bank account?
                </label>
                <select
                  value={debitDay}
                  onChange={(e) => setDebitDay(e.target.value)}
                  className="w-full h-11 bg-[#262626] border border-[#4A4A4A] rounded-lg px-4 text-sm text-white focus:border-[#1FC3EB] focus:outline-none transition-colors cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%239CA3AF' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 16px center",
                    appearance: "none",
                  }}
                >
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                    <option key={day} value={String(day)}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col items-center justify-center p-6 border-t border-[#3A3A3A] bg-[#1E1E1E] space-y-3 flex-shrink-0">
          <button
            onClick={handleDownloadQuote}
            className="text-xs font-medium text-[#1FC3EB] hover:underline transition-all"
          >
            Download quote
          </button>
          
          {/* Main Next Button */}
          <button
            onClick={onNext}
            disabled={!isFormValid}
            className={`w-full max-w-[200px] h-10 rounded-lg font-bold text-sm shadow-md transition-all flex items-center justify-center ${
              !isFormValid ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
            }`}
            style={{
              background: "#F59E0B", // Premium matching bright golden orange from screenshot
              color: "#0A0A0A",
            }}
          >
            Next
          </button>

          <button
            onClick={onClose}
            className="text-xs font-medium text-[#1FC3EB] hover:underline transition-all"
          >
            or go back
          </button>
        </div>
      </div>
    </div>
  );
}
