import { Mail, Key, Lock, Check } from "lucide-react";

type Step = "email" | "key" | "lock";

export default function ResetSteps({ current = "key" }: { current?: Step }) {
  const steps: { id: Step; icon: React.ReactNode; doneIcon: React.ReactNode; label: string }[] = [
    { id: "email", icon: <Mail className="w-4 h-4" />, doneIcon: <Check className="w-4 h-4" />, label: "Email" },
    { id: "key", icon: <Key className="w-4 h-4" />, doneIcon: <Check className="w-4 h-4" />, label: "Verify" },
    { id: "lock", icon: <Lock className="w-4 h-4" />, doneIcon: <Check className="w-4 h-4" />, label: "Reset" },
  ];

  const currentIndex = steps.findIndex((s) => s.id === current);

  return (
    <div className="flex items-center justify-center w-full">
      {steps.map((step, idx) => {
        const isDone = idx < currentIndex;
        const isActive = idx === currentIndex;

        return (
          <div key={step.id} className="flex items-center">
            {/* Circle */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                isDone || isActive
                  ? "bg-[#16A34A] text-white"
                  : "bg-[#F3F4F6] text-[#99A1AF]"
              } ${isActive ? "ring-4 ring-[#DCFCE7]" : ""}`}
              aria-label={step.label}
              aria-current={isActive ? "step" : undefined}
            >
              {isDone ? step.doneIcon : step.icon}
            </div>

            {/* Connector Line */}
            {idx < steps.length - 1 && (
              <div
                className={`w-16 h-0.5 mx-2 transition-colors ${
                  idx < currentIndex ? "bg-[#16A34A]" : "bg-[#E5E7EB]"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}