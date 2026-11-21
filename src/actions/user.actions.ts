"use server";


import { changePasswordSchema, ChangePasswordSchemaType, profileSchema, ProfileSchemaType } from "@/lib/schemas/account.schema";
import { changeMyPassword, updateMyProfile } from "@/services/user.service";

export async function changePasswordAction(values: ChangePasswordSchemaType) {
  const parsed = changePasswordSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0].message };
  }
  return changeMyPassword(parsed.data);
}

export async function updateProfileAction(values: ProfileSchemaType) {
  const parsed = profileSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0].message };
  }
  return updateMyProfile(parsed.data);
}