interface User {
  email: string;
  userName: string;
  verified: boolean;
}

interface AxiosResponseType {
  ok: boolean;
}

interface ComicPostResponse {
  link: string;
  message: string;
}

declare module "typewriter-effect/dist/core" {
  const Typewriter: any; // Use 'any' if no TypeScript definition is available
  export default Typewriter;
}

interface GetComicsType {
  id: string;
  ComicTitle: string;
  Description: string;
  CoverImage: string;
  Origin: string;
  Genres: string;
  Status: string;
  Author?: string;
  Artist?: string;
  Badges?: string;
  Date: string;
}

interface ComicDetailsProps {
  ComicTitle: string;
  CoverImage: string;
  Description: string;
  id: string;
}

interface ChapterNumbers {
  chapterID: number;
  ChapterNumber: string;
  ChapterName?: string;
  chapterDate: string;
}

interface ChapterResponse {
  chapters: ChapterNumbers[];
  comicDetails: ComicDetailsProps;
}
