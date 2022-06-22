import React from "react";
import { useParams } from "react-router-dom";
import ManageContent from "../components/componentAdmin/ManageContent/ManageContent";
import Layout2 from "../layout/Layout2";

const AdminPage = () => {
  const slug = useParams();

  return (
    <Layout2 link={slug.manage || "category"}>
      <ManageContent link={slug.manage || "category"} />
    </Layout2>
  );
};

export default AdminPage;
