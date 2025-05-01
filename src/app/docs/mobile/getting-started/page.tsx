import ParagraphComponent from "@/(mesaui)/Paragraph";
import TitleComponent from "@/(mesaui)/title";
import React from "react";

const GettingStartedDocs = () => {
  return (
    <div className="flex flex-col gap-4 p-4 xl:p-8">
      <TitleComponent size="medium">Getting Started</TitleComponent>
      <ParagraphComponent>
        Welcome to the MESA Mobile App! This guide will help you get started on
        using the application.
      </ParagraphComponent>

      <TitleComponent size="small">Signing In / Up</TitleComponent>
      <ParagraphComponent>
        As of right now, the app is only available on the App Store. It will be
        releasing on Google App Store in just a few months.
      </ParagraphComponent>
      <ParagraphComponent>
        There are 2 ways to sign up on the app.
      </ParagraphComponent>
      <ParagraphComponent size="large">
        <b>Option 1: Creating an account from scratch.</b>
      </ParagraphComponent>
      <ParagraphComponent size="large">
        <b>Option 2: Using your Google or Apple (iOS) account.</b>
      </ParagraphComponent>
    </div>
  );
};

export default GettingStartedDocs;
