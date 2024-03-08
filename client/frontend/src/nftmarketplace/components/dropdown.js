import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const categories = [
  { name: "All Categories" },
  { name: "Art" },
  { name: "Gaming" },
  { name: "Memberships" },
  { name: "PFPs" },
  { name: "Photography" },
  { name: "Music" },
];

export default function DropDown() {
  const [selected, setSelected] = useState(categories[0]);

  return (
    <div className="w-48">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-pointer rounded-xl text-left font-semibold hover:bg-gray-200 bg-gray-100 py-3 px-6">
            <span className="block truncate text-md">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
              <ChevronUpDownIcon className="h-6 w-6" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm rounded-xl bg-white shadow-2xl p-2">
              {categories.map((category, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `block py-4 rounded-lg relative cursor-default select-none pl-8 hover:bg-gray-100 text-gray-900`
                  }
                  value={category}
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate text-md`}>
                        {category.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-400">
                          <CheckIcon className="h-4 w-4" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
