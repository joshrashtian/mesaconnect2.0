"use client";
import { QRCodeSVG } from "qrcode.react";
import React, { useState } from "react";

const QRCode = ({ id }: { id: string }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      <QRCodeSVG value={id} />
    </div>
  );
};

export default QRCode;
