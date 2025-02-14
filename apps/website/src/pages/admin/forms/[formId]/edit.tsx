import React from "react";
import type {
  InferGetStaticPropsType,
  NextPage,
  GetServerSidePropsContext,
} from "next";

import { getAdminSSP } from "@/server/utils/admin";
import { permissions } from "@/config/permissions";

import { AdminPageLayout } from "@/components/admin/AdminPageLayout";
import Meta from "@/components/content/Meta";
import { FormForm } from "@/components/admin/forms/FormForm";
import { Headline } from "@/components/admin/Headline";
import { Panel } from "@/components/admin/Panel";
import { trpc } from "@/utils/trpc";
import { MessageBox } from "@/components/shared/MessageBox";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const adminProps = await getAdminSSP(context, permissions.manageForms);
  if (!adminProps) {
    return { notFound: true };
  }

  const id = context.params?.formId;
  if (!id) {
    return { notFound: true };
  }

  return {
    props: {
      ...adminProps,
      formId: String(id),
    },
  };
}

const AdminEditFormPage: NextPage<
  InferGetStaticPropsType<typeof getServerSideProps>
> = ({ menuItems, formId }) => {
  const form = trpc.adminForms.getForm.useQuery(formId);

  return (
    <>
      <Meta title="Edit Form | Admin" />

      <AdminPageLayout title="Edit Form" menuItems={menuItems}>
        <Headline>Create new Form</Headline>

        <Panel>
          {form.data ? (
            <FormForm action="edit" form={form.data} />
          ) : (
            <MessageBox>Loading …</MessageBox>
          )}
        </Panel>
      </AdminPageLayout>
    </>
  );
};
export default AdminEditFormPage;
