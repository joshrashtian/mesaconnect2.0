import ParagraphComponent from "@/(mesaui)/Paragraph";
import TitleComponent from "@/(mesaui)/title";
import React from "react";

const GettingStartedDocs = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <TitleComponent size="medium">Getting Started</TitleComponent>
      <ParagraphComponent>
        Welcome to the MESA Mobile App! This guide will help you get started on
        using the application.
      </ParagraphComponent>

      <TitleComponent size="small">Downloading the App</TitleComponent>
      <ParagraphComponent>
        As of right now, the app is only available on the App Store. It will be
        releasing on Google App Store in just a few months.
      </ParagraphComponent>
    </div>
  );
};

export default GettingStartedDocs;
