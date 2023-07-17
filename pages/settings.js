import React from "react";
import ForYouSearch from "@/components/ForYouSearch";
import ForYouSideBar from "@/components/ForYouSideBar";
import SettingsPage from "@/components/SettingsPage";

export default function settings() {
  return (
    <>
      <ForYouSearch />
      <ForYouSideBar />
      <SettingsPage />
    </>
  );
}
