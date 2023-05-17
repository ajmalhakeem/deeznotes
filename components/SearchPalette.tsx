import { Fragment, useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import Fuse from "fuse.js";

type Note = {
  title: string;
  content: string;
};

type ResultNote = Note & { matches?: Fuse.FuseResultMatch[] };

const notes: Note[] = [
  {
    title: "Grocery List",
    content:
      "Eggs, Milk, Bread, Butter, Cheese, Apples, Bananas, Oranges, Chicken, Broccoli.",
  },
  {
    title: "Meeting Notes",
    content:
      "Discussed Q2 targets. Need to increase marketing spend. Hire 2 more sales reps.",
  },
  {
    title: "Book Recommendations",
    content:
      "The Silent Patient, The Nightingale, Where the Crawdads Sing, Educated.",
  },
  {
    title: "Travel Itinerary",
    content:
      "Day 1: Arrival, Day 2: City tour, Day 3: Visit museums, Day 4: Beach, Day 5: Departure.",
  },
  {
    title: "Workout Plan",
    content:
      "Monday: Chest, Tuesday: Back, Wednesday: Legs, Thursday: Shoulders, Friday: Arms.",
  },
  {
    title: "Coding Todo",
    content:
      "Fix bug in search component. Improve mobile responsiveness. Add tests for new features.",
  },
  {
    title: "Birthday Party Ideas",
    content:
      "Theme: Superheroes, Cake: Batman, Games: Treasure hunt, Costume contest.",
  },
  {
    title: "Recipe: Spaghetti Carbonara",
    content:
      "Ingredients: Spaghetti, Eggs, Bacon, Parmesan, Garlic, Salt, Pepper.",
  },
  {
    title: "Health Goals",
    content:
      "1. Run 3 times a week. 2. Eat more vegetables. 3. Drink 2L of water daily. 4. Sleep 8 hours.",
  },
  {
    title: "New Year Resolutions",
    content:
      "1. Read 1 book per month. 2. Learn a new language. 3. Travel to a new country.",
  },
];

const fuseOptions = {
  keys: ["title", "content"],
  includeScore: true,
  includeMatches: true,
};

const fuse = new Fuse(notes, fuseOptions);

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function SearchPalette() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<ResultNote[]>([]);

  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }

    const results = fuse
      .search(searchTerm)
      .map(({ item, matches }) => ({ ...item, matches })) as ResultNote[];

    setSearchResults(results);
  }, [searchTerm]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && event.metaKey) {
        setOpen((prevOpen) => !prevOpen);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  console.log(searchResults);
  return (
    <Transition.Root
      show={open}
      as={Fragment}
      afterLeave={() => setQuery("")}
      appear
    >
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
              <Combobox
                onChange={(person: any) => (window.location = person.url)}
              >
                <div className="relative">
                  <Combobox.Input
                    className="block w-full appearance-none bg-transparent py-4 pl-4 pr-12 text-base text-slate-900 placeholder:text-slate-600 focus:outline-none sm:text-sm sm:leading-6"
                    placeholder="Search..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {searchResults.length > 0 && (
                  <Combobox.Options
                    static
                    className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800"
                  >
                    {searchResults.map((note, index) => (
                      <Combobox.Option
                        key={index}
                        value={note}
                        className={({ active }) =>
                          classNames(
                            "cursor-default select-none px-4 py-2",
                            active && "bg-gray-100 text-white"
                          )
                        }
                      >
                        {({ active }) => (
                          <>
                            <div className="ml-4 flex-auto">
                              <p
                                className={classNames(
                                  "text-sm font-medium",
                                  active ? "text-gray-900" : "text-gray-700"
                                )}
                              >
                                {note.title}
                              </p>
                              <p
                                className={classNames(
                                  "text-sm",
                                  active ? "text-gray-700" : "text-gray-500"
                                )}
                              >
                                {note.content}
                              </p>
                            </div>
                          </>
                        )}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                )}
                {searchResults.length === 0 && (
                  <p className="p-4 text-sm text-gray-500">No notes found.</p>
                )}
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
