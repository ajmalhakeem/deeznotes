import SearchPalette from "@/components/SearchPalette";
import packageJson from "../package.json";

export default function Home() {
  return (
    <>
      <div>
        <SearchPalette></SearchPalette>
        <div className="h-screen relative">
          <div className="absolute bottom-0 right-0 m-4 text-gray-300 text-sm font-mono">
            <span>Hakeem Jamal · v{packageJson.version}</span>
          </div>
        </div>
      </div>
    </>
  );
}
