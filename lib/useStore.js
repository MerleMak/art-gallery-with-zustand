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
              : [...artPiecesInfo, { slug, isFavorite: true }],
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
