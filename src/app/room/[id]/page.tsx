import React from "react";
import Loading from "./Loading";

const RoomPage = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <Loading />
    </div>
  );
};

export default RoomPage;
