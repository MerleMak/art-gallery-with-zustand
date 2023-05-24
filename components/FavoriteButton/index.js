import Image from "next/image.js";
import styled from "styled-components";
import useStore from "@/lib/useStore";

export default function FavoriteButton({ slug, positionAbsolute = false }) {
  const toggleFavorites = useStore((state) => state.toggleFavorites);
  const isFavorite = useStore(
    (state) =>
      state.artPiecesInfo.find((artPiece) => artPiece.slug === slug)?.isFavorite
  );
  return (
    <Button
      type="button"
      onClick={() => toggleFavorites(slug)}
      isFavorite={isFavorite}
      aria-label={isFavorite ? "unlike" : "like"}
      positionAbsolute={positionAbsolute}
    >
      <Image src="/assets/heart.svg" width={40} height={40} alt="" />
    </Button>
  );
}

const Button = styled.button`
  position: ${({ positionAbsolute }) =>
    positionAbsolute ? "absolute" : "static"};
  right: 1rem;
  top: 1.5rem;
  z-index: 1;
  background-color: ${(props) => (props.isFavorite ? "lightcoral" : "white")};
  border: 3px solid black;
  border-radius: 50%;
  display: grid;
  place-items: center;
  width: 50px;
  height: 50px;
  padding: 0.2rem 0 0;
`;
