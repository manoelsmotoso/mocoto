import ytpl from "ytpl";
import type { QueryLoader } from "../query-loader";
import { YoutubeTrack } from "../track";

const MAX_ITEMS = Infinity;

async function getTracks(query: string) {
  if (!query.includes("list=")) return null;
  try {
    const playlist = await ytpl(query, { limit: MAX_ITEMS });
    return Promise.all(playlist.items.map((i) => YoutubeTrack.fromUrl(i.url)));
  } catch (err) {
    return null;
  }
}

const queryLoader: QueryLoader = {
  getTracks,
};
export default queryLoader;
