import ArtPieces from "../../components/ArtPieces";

export default function ArtPiecesPage({
  pieces,
  onArtPiecesInfo,
  artPiecesInfo,
}) {
  return (
    <ArtPieces
      pieces={pieces}
      onArtPiecesInfo={onArtPiecesInfo}
      artPiecesInfo={artPiecesInfo}
    />
  );
}
