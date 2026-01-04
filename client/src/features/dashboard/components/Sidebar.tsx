import { useMemo, useState } from "react";
import { type Link } from "../types/api";
import {
  BookmarkIcon,
  HomeIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";

import { CheckCircleIcon } from "@heroicons/react/24/solid";

/*
Other possibilities in the creation of the tag object (for small arrays):

const tagNames = Array.from(new Set(...links.map(link => link.tags)))
const obj: Record<string, number> = {};
tagNames.forEach((name) => {
  const n = links.filter((link) => link.tags.includes(name)).length
  obj[name] = n
})
return obj;
*/

export const Sidebar = ({ links }: { links: Link[] }) => {
  const [archived, setArchived] = useState<boolean>(true); // TODO: state on filter context
  const [selectedTags, setSelectedTags] = useState<string[]>([]); // TODO: state on filter context

  const tags = useMemo(() => {
    const counts = links.reduce((acc, link) => {
      link.tags.forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {} as { [k: string]: number });

    return Object.keys(counts)
      .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
      .map((name) => ({
        name,
        count: counts[name],
      }));
  }, [links]);

  const handleTag = (name: string) => {
    if (selectedTags.includes(name)) {
      setSelectedTags((prev) => prev.filter((n) => n !== name));
    } else {
      setSelectedTags((prev) => [...prev, name]);
    }
  };

  return (
    <aside className="flex flex-col gap-5 pl-4 pt-4 border-r-2 border-r-black w-1/5 h-full">
      <h1 className="flex items-center gap-1 text-xl font-jakarta font-bold">
        <span className="bg-green-800 p-2 rounded-lg">
          <BookmarkIcon className="size-4 stroke-3 text-white" />
        </span>
        Boomark Manager
      </h1>
      <div className="flex flex-col gap-2 w-[90%]">
        <button
          className={`flex items-center text-stone-700 font-jakarta text-sm font-semibold gap-2 ${
            archived || "bg-slate-400/20"
          } px-2 py-1 rounded-lg cursor-pointer duration-300 ease`}
          onClick={() => setArchived(false)}
        >
          <HomeIcon className="size-5" />
          Home
        </button>
        <button
          className={`flex items-center text-stone-700 gap-2 font-jakarta text-sm font-semibold ${
            archived && "bg-slate-400/20"
          } px-2 py-1 rounded-lg cursor-pointer duration-300 ease`}
          onClick={() => setArchived(true)}
        >
          <ArchiveBoxIcon className="size-5" />
          Archived
        </button>
      </div>
      <div>
        <p className="text-xs font-semibold mb-2 text-stone-600">TAGS</p>
        <ul className="flex flex-col gap-2">
          {tags.map((tag) => (
            <li
              className={`${
                selectedTags.includes(tag.name)
                  ? "bg-slate-400/20"
                  : "bg-transparent"
              } flex items-center py-1.5 duration-300 ease px-2 rounded-md justify-between w-[90%] cursor-pointer`}
              onClick={() => handleTag(tag.name)}
              key={tag.name}
            >
              <span className="flex items-center gap-1">
                <CheckCircleIcon
                  className={`size-5 duration-300 ease ${
                    selectedTags.includes(tag.name)
                      ? "text-green-900"
                      : "text-stone-600"
                  }`}
                />
                <span>{tag.name}</span>
              </span>
              <span className="px-2 py-0.5 text-sm rounded-full text-stone-900 font-medium bg-slate-600/20">
                {tag.count}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};
