import { useEffect, useState } from "react";
import Map from "./Components/Map";
import { Era, HistEvent } from "./types";
import { eventsData } from "./events";
import ReactSlider from "react-slider";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [selectedEra, setSelectedEra] = useState("Prehistory");
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);
  const [startYear, setStartYear] = useState(-300000);
  const [endYear, setEndYear] = useState(3000000);

  useEffect(() => {
    let era = eventsData.find((e) => e.name === selectedEra) as Era;
    if (era) {
      setStartYear(era.startYear);
      setEndYear(era.endYear);
    }
  }, []);

  return (
    <>
      <div>
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
          <div className="flex grow flex-col overflow-y-auto bg-[#f7d098] px-6 pb-4">
            <img className="" src="/logo-trans.png" alt="3Dera" />
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="-mx-2 space-y-1">
                {eventsData.map((item) => (
                  <li key={item.name}>
                    <button
                      onMouseEnter={() => setHoveredEvent(item.name)}
                      onMouseLeave={() => setHoveredEvent(null)}
                      className={classNames(
                        selectedEra === item.name
                          ? "bg-[#472911] text-white"
                          : "text-black hover:text-white hover:bg-[#543d2a]",
                        "group flex flex-col gap-x-3 rounded-xl p-2 text-sm leading-6 font-semibold w-full border border-[#472911] hover:border-[#472911] hover:shadow-lg drop-shadow-xl"
                      )}
                      onClick={() => {
                        setSelectedEra(item.name);
                        setStartYear(item.startYear);
                        setEndYear(item.endYear);
                      }}
                    >
                      <div>{item.name}</div>
                      <div className={`text-xs`}>
                        {item.startYear < 0
                          ? `${item.startYear * -1} BCE`
                          : item.startYear}{" "}
                        -{" "}
                        {item.endYear < 0
                          ? `${item.endYear * -1} BCE`
                          : item.endYear}
                      </div>
                    </button>
                    {/* put this div to the right of the button div */}
                    {hoveredEvent && hoveredEvent === item.name && (
                      <div className="absolute mt-[-100px] w-96 text-sm border border-black rounded-xl z-20 bg-[#f7d098] left-full">
                        <div className="flex flex-col justify-between p-4 pt-0 gap-4">
                          <div>
                            {
                              eventsData.find((e) => e.name === hoveredEvent)
                                ?.description
                            }
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72 bg-amber-50">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4  border-gray-200  px-4">
            <div className="text-2xl font-bold">Range</div>
            <div className="p-4  w-full gap-4 flex flex-col">
              <ReactSlider
                className="horizontal-slider bg-amber-50"
                thumbClassName="customSlider-thumb"
                trackClassName="customSlider-track"
                min={eventsData.find((e) => e.name === selectedEra)?.startYear}
                max={eventsData.find((e) => e.name === selectedEra)?.endYear}
                defaultValue={[startYear, endYear]}
                value={[startYear, endYear]}
                pearling
                onChange={(values: number[]) => {
                  setStartYear(values[0]);
                  setEndYear(values[1]);
                }}
                ariaLabel={["Lower thumb", "Upper thumb"]}
              />
              <div className="flex justify-between">
                <div>{startYear < 0 ? `${startYear * -1} BCE` : startYear}</div>
                <div>{endYear < 0 ? `${endYear * -1} BCE` : endYear}</div>
              </div>
            </div>
            <div
              className="h-6 w-px bg-gray-900/10 lg:hidden"
              aria-hidden="true"
            />
          </div>

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="w-full flex-grow">
                <Map
                  era={eventsData.find((e) => e.name === selectedEra) as Era}
                  startYear={startYear}
                  endYear={endYear}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
