import React from "react";
import { NASAImageResponseDTO } from "../../types/nasa";

interface Props {
  index: number;
  imageData: NASAImageResponseDTO;
}

export const NASAImageCard = ({ index, imageData }: Props) => {
  return (
    <div key={index}>
      <h2>{imageData.title}</h2>
      <p>{imageData.date}</p>
      <img
        src={imageData.url}
        alt={imageData.title}
        style={{ maxWidth: "100%" }}
      />
      <p>{imageData.explanation}</p>
    </div>
  );
};
