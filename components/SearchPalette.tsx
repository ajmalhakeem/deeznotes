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
  {
    title: "Famous Quotes",
    content:
      "1. 'The only way to do great work is to love what you do.' - Steve Jobs. 2. 'The mind is everything. What you think you become.' - Buddha. 3. 'In the middle of every difficulty lies opportunity.' - Albert Einstein.",
  },
  {
    title: "Movie List",
    content:
      "Inception, The Dark Knight, The Godfather, Pulp Fiction, The Shawshank Redemption, Fight Club, The Matrix, Schindler's List.",
  },
  {
    title: "Gardening To-do",
    content:
      "Water plants. Trim hedges. Mow lawn. Plant new rose bushes. Fertilize flower bed.",
  },
  {
    title: "Learning Goals",
    content:
      "Complete online course in AI. Attend Python coding workshop. Read 5 books on data science. Get certified in machine learning.",
  },
  {
    title: "Home Improvement",
    content:
      "Paint living room. Fix leaky faucet. Organize garage. Install new light fixtures in kitchen.",
  },
  {
    title: "Favorite Recipes",
    content:
      "Butter Chicken, Tacos, Caesar Salad, Margherita Pizza, Chocolate Chip Cookies, Red Velvet Cake.",
  },
  {
    title: "Children's Schedule",
    content:
      "Monday: Soccer practice, Tuesday: Music lessons, Wednesday: Tutoring, Thursday: Playdate, Friday: Swimming lessons.",
  },
  {
    title: "Motivational Quotes",
    content:
      "1. 'The future belongs to those who believe in the beauty of their dreams.' - Eleanor Roosevelt. 2. 'The only limit to our realization of tomorrow will be our doubts of today.' - Franklin D. Roosevelt. 3. 'You are never too old to set another goal or to dream a new dream.' - C.S. Lewis.",
  },
  {
    title: "Weekly Menu",
    content:
      "Monday: Salmon and veggies, Tuesday: Chicken stir-fry, Wednesday: Spaghetti Bolognese, Thursday: Vegan curry, Friday: Pizza night.",
  },
  {
    title: "Business Ideas",
    content:
      "Online tutoring platform, Mobile pet grooming service, Virtual reality fitness app, Eco-friendly clothing line.",
  },
  {
    title: "Photography Locations",
    content:
      "Golden Gate Bridge, Grand Canyon, Niagara Falls, Eiffel Tower, Pyramids of Giza, Santorini, Maldives, Great Barrier Reef.",
  },
  {
    title: "Leadership Quotes",
    content:
      "1. 'The greatest leader is not necessarily the one who does the greatest things. He is the one that gets the people to do the greatest things.' - Ronald Reagan. 2. 'I can't change the direction of the wind, but I can adjust my sails to always reach my destination.' - Jimmy Dean.",
  },
  {
    title: "Family Game Night",
    content:
      "Monopoly, Scrabble, Uno, Jenga, Pictionary, Codenames, Twister, Catan.",
  },
  {
    title: "Learning Resources",
    content:
      "Coursera, Khan Academy, Codecademy, Udemy, OpenAI, edX, Project Euler, LeetCode.",
  },
  {
    title: "Local Events",
    content:
      "Farmers market on Saturday, Book club on Tuesday, Jazz concert on Friday, Art exhibit opening next week.",
  },
  {
    title: "Self-Care Routine",
    content:
      "Morning yoga, Healthy breakfast, 10-minute meditation, Evening skincare routine, Read before bed.",
  },
  {
    title: "Inspiring Book Quotes",
    content:
      "1. 'It is our choices, Harry, that show what we truly are, far more than our abilities.' - J.K. Rowling, Harry Potter and the Chamber of Secrets. 2. 'I wish it need not have happened in my time,' said Frodo. 'So do I,' said Gandalf, 'and so do all who live to see such times. But that is not for them to decide. All we have to decide is what to do with the time that is given us.' - J.R.R. Tolkien, The Fellowship of the Ring.",
  },
  {
    title: "Healthy Snack Ideas",
    content:
      "Hummus and vegetables, Greek yogurt and berries, Peanut butter and apple slices, Almonds, Protein shake, Boiled eggs.",
  },
  {
    title: "Outdoor Activities",
    content:
      "Hiking, Biking, Swimming, Camping, Kayaking, Rock climbing, Bird watching, Picnicking.",
  },
  {
    title: "DIY Projects",
    content:
      "Build a birdhouse, Create homemade soap, Knit a scarf, Paint a canvas, Plant an herb garden, Refurbish an old chair.",
  },
];

const fuseOptions = {
  keys: ["title", "content"],
  includeScore: true,
  includeMatches: true,
  shouldSort: true,
  tokenize: true,
  matchAllTokens: true,
  location: 0,
  threshold: 0.3,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 2,
  useExtendedSearch: true,
};

const fuse = new Fuse(notes, fuseOptions);

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

function getHighlightedText(text: string, matches: Fuse.FuseResultMatch[]) {
  const indices = matches.flatMap((match) => match.indices);

  if (indices.length === 0) {
    return [text];
  }

  const segments: string[] = [];
  let currentPosition = 0;

  for (const [start, end] of indices) {
    const unmatched = text.slice(currentPosition, start);

    if (unmatched) {
      segments.push(unmatched);
    }

    const matched = text.slice(start, end + 1);
    segments.push(`[[${matched}]]`);

    currentPosition = end + 1;
  }

  if (currentPosition < text.length) {
    const unmatched = text.slice(currentPosition);
    segments.push(unmatched);
  }

  return segments;
}

export default function SearchPalette() {
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

  return (
    <Transition.Root
      show={open}
      as={Fragment}
      afterLeave={() => setSearchResults([])}
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
                    className="font-mono block w-full appearance-none bg-transparent py-4 pl-4 pr-12 text-base text-slate-900 placeholder:text-slate-300 focus:outline-none sm:text-sm sm:leading-6"
                    placeholder="travel, work, recipes, etc."
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
                        {({ active }) => {
                          const titleSegments = getHighlightedText(
                            note.title,
                            note.matches?.filter(
                              (match) => match.key === "title"
                            ) || []
                          );
                          const contentSegments = getHighlightedText(
                            note.content,
                            note.matches?.filter(
                              (match) => match.key === "content"
                            ) || []
                          );

                          return (
                            <>
                              <div className="ml-4 flex-auto font-mono">
                                <p
                                  className={classNames(
                                    "text-sm font-medium",
                                    active ? "text-gray-900" : "text-gray-700"
                                  )}
                                >
                                  {titleSegments.map((segment, index) =>
                                    segment.startsWith("[[") &&
                                    segment.endsWith("]]") ? (
                                      <span
                                        key={index}
                                        className="bg-yellow-200"
                                      >
                                        {segment.slice(2, -2)}
                                      </span>
                                    ) : (
                                      segment
                                    )
                                  )}
                                </p>
                                <p
                                  className={classNames(
                                    "text-sm",
                                    active ? "text-gray-700" : "text-gray-500"
                                  )}
                                >
                                  {contentSegments.map((segment, index) =>
                                    segment.startsWith("[[") &&
                                    segment.endsWith("]]") ? (
                                      <span
                                        key={index}
                                        className="bg-yellow-200"
                                      >
                                        {segment.slice(2, -2)}
                                      </span>
                                    ) : (
                                      segment
                                    )
                                  )}
                                </p>
                              </div>
                            </>
                          );
                        }}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                )}
                {searchResults.length === 0 && (
                  <p className="p-4 text-sm text-gray-500 font-mono">
                    no notes found.
                  </p>
                )}
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
