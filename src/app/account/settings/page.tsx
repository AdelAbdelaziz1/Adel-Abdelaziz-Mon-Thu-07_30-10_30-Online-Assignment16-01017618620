import {
  ProfileInformationCard,
} from "@/components/account/ProfileInformationCard";
import { AccountInformationCard } from "@/components/account/AccountInformationCard";
import { ChangePasswordCard } from "@/components/account/ChangePasswordCard";

export default function AccountSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Account Settings</h2>
        <p className="mt-1 text-sm text-gray-500">
          Update your profile information and change your password
        </p>
      </div>

      <div className="space-y-6">
        <ProfileInformationCard />
        <AccountInformationCard />
      </div>

      <ChangePasswordCard />
    </div>
  );
}