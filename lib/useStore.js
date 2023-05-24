import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      artPiecesInfo: [],
      toggleFavorites: (slug) =>
        set(({ artPiecesInfo }) => {
          const artPiece = artPiecesInfo.find(
            (artPiece) => artPiece.slug === slug
          );
          return {
            artPiecesInfo: artPiece
              ? artPiecesInfo.map((pieceInfo) =>
                  pieceInfo.slug === slug
                    ? { ...pieceInfo, isFavorite: !pieceInfo.isFavorite }
                    : pieceInfo
                )
              : [{ slug, isFavorite: true }, ...artPiecesInfo],
          };
        }),
      addComment: (slug, newComment) =>
        set(({ artPiecesInfo }) => {
          const artPiece = artPiecesInfo.find((piece) => piece.slug === slug);
          return {
            artPiecesInfo: artPiece
              ? artPiecesInfo.map((pieceInfo) => {
                  if (pieceInfo.slug === slug) {
                    return pieceInfo.comments
                      ? {
                          ...pieceInfo,
                          comments: [...pieceInfo.comments, newComment],
                        }
                      : { ...pieceInfo, comments: [newComment] };
                  } else {
                    return pieceInfo;
                  }
                })
              : [
                  ...artPiecesInfo,
                  { slug, isFavorite: false, comments: [newComment] },
                ],
          };
        }),
    }),
    {
      name: "art-gallery-storage",
      partialize: (state) => ({ artPiecesInfo: state.artPiecesInfo }),
    }
  )
);

export default useStore;
