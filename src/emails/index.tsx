import { EventResults } from "@/_functions/sendEventKioskResults";
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

export default function Email({ event, attendees }: EventResults) {
  return (
    <Tailwind>
      <Section>
        <Row className="flex flex-row items-center">
          <Column>
            <Img src="https://gnmpzioggytlqzekuyuo.supabase.co/storage/v1/object/public/seo/mesalogo.png" />
          </Column>
          <Column>
            <Heading className="p-3 font-sans text-4xl font-extrabold">
              Information for {event.name}
            </Heading>
          </Column>
        </Row>
      </Section>
      <Hr />
      <Section className="m-4 rounded-xl bg-zinc-200/40 p-10">
        <Row>
          <Column>
            <Text className="font-sans text-2xl font-bold">
              Thank you for submitting your information to MESAConnect!
            </Text>
          </Column>
        </Row>
      </Section>
    </Tailwind>
  );
}
