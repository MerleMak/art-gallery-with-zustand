import { act, renderHook } from "@testing-library/react";
import useStore from "./useStore";

test("has correct initial state", () => {
  const { result } = renderHook(useStore);

  const artPiecesInfo = result.current.artPiecesInfo;
  expect(artPiecesInfo).toStrictEqual([]);
});

test("toggles favorite correctly", () => {
  const { result } = renderHook(useStore);

  act(() => {
    result.current.toggleFavorites("mmm");
  });

  const artPiecesInfo = result.current.artPiecesInfo;
  expect(artPiecesInfo.length).toBe(1);
  expect(artPiecesInfo[0].slug).toBe("mmm");
  expect(artPiecesInfo[0].isFavorite).toBe(true);
});

test("toggles existing artPiece to not be a favorite", () => {
  const { result } = renderHook(useStore);

  act(() => {
    result.current.toggleFavorites("mmm");
    result.current.toggleFavorites("mmm");
  });

  const artPiecesInfo = result.current.artPiecesInfo;
  expect(artPiecesInfo.length).toBe(1);
  expect(artPiecesInfo[0].slug).toBe("mmm");
  expect(artPiecesInfo[0].isFavorite).toBe(false);
});

test("toggles existing artPiece to be a favorite again", () => {
  const { result } = renderHook(useStore);

  act(() => {
    result.current.toggleFavorites("mmm");
    result.current.toggleFavorites("fff");
    result.current.toggleFavorites("fff");
  });

  const artPiecesInfo = result.current.artPiecesInfo;
  const artPiece = artPiecesInfo.find((artPiece) => artPiece.slug === "fff");
  expect(artPiecesInfo.length).toBe(2);
  expect(artPiece.slug).toBe("fff");
  expect(artPiece.isFavorite).toBe(false);
});
