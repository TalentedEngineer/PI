import React, { Fragment } from "react";
import {
  ChevronUpIcon,
  LightBulbIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";

import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { Disclosure } from "@headlessui/react";

const PublishTab = () => {
  return (
    <div id="overview" className="mb-10">
      <div className="p-4 pb-5 pt-2 text-center">
        <h2 className="text-5xl font-extrabold tracking-tight text-nft-primary-light">
          Ready to Publish?
        </h2>
        <p className="text-xl my-10 font-bold text-gray-700">
          Let's publish your Gig and get some buyers rolling in!
        </p>
      </div>
    </div>
  );
};

export default PublishTab;
