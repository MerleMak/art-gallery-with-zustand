import ArtPieces from "../../components/ArtPieces";

export default function FavoritesPage({ pieces, artPiecesInfo }) {
  const favorites = pieces.filter((piece) =>
    artPiecesInfo.find(
      (artPiece) => artPiece.slug === piece.slug && artPiece.isFavorite
    )
  );

  return <ArtPieces pieces={favorites} />;
}
