import GlobalStyle from "../styles";
import useSWR from "swr";
import Layout from "../components/Layout.js";
import useStore from "@/lib/useStore";

const fetcher = async (...args) => {
  const response = await fetch(...args);
  if (!response.ok) {
    throw new Error(`Request with ${JSON.stringify(args)} failed.`);
  }
  return await response.json();
};

export default function App({ Component, pageProps }) {
  const { data, isLoading, error } = useSWR(
    "https://example-apis.vercel.app/api/art",
    fetcher
  );

  const artPiecesInfo = useStore((state) => state.artPiecesInfo);

  const toggleFavorites = useStore((state) => state.toggleFavorites);

  const addComment = useStore((state) => state.addComment);

  return (
    <Layout>
      <GlobalStyle />
      <Component
        {...pageProps}
        pieces={isLoading || error ? [] : data}
        artPiecesInfo={artPiecesInfo}
        onToggleFavorite={toggleFavorites}
        addComment={addComment}
      />
    </Layout>
  );
}
