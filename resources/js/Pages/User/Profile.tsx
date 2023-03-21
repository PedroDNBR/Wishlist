import { Layout } from "@/Base/Layout";

import { ProfileForm } from "@/Components/Forms/User/Profile";
import { User } from "@/Types/User";
import { useState } from "react";

interface ProfileProps {
  errors: Record<string, string>;
  auth: {
    user: User;
  }
}

export default function Profile({ errors, auth: { user } }: ProfileProps) {
  return (
    <>
      <Layout user={user}>
        <ProfileForm user={user} errors={errors} />
      </Layout>
    </>
  )
}