import {
  Button,
  Column,
  Heading,
  Hr,
  Html,
  Img,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

export default function Email() {
  return (
    <Tailwind>
      <Section>
        <Row className="flex flex-row items-center">
          <Column>
            <Img src="https://gnmpzioggytlqzekuyuo.supabase.co/storage/v1/object/public/seo/mesalogo.png" />
          </Column>
          <Column>
            <Heading className="p-3 font-sans text-4xl font-extrabold">
              MESAConnect
            </Heading>
          </Column>
        </Row>
      </Section>
      <Hr />
    </Tailwind>
  );
}
