import React, {useEffect} from 'react';

import {
  Card,
  ICardTokens,
  ICardSectionStyles,
  ICardSectionTokens,
} from '@fluentui/react-cards';
import {Link} from 'react-router-dom';

export default function SchedulingLinkCard(props: any) {
  const {schedulingLink} = props;
  const {id} = schedulingLink;

  const footerCardSectionTokens: ICardSectionTokens = {
    padding: '12px 0px 0px',
  };
  return (
    <div>
      <Link to={`/links/${id}`}>
        <div className="group cursor-pointer rounded-lg p-4 border border-gray-200 hover:bg-light-blue-500 hover:border-transparent hover:shadow-lg">
          <dl className="grid sm:block lg:grid xl:block grid-cols-2 grid-rows-2 items-center">
            <div className="pb-5">
              <dt className="sr-only">Title</dt>
              <dd className="leading-6 font-medium text-black group-hover:text-white">
                {schedulingLink?.name}
                {/*New Benefits Plan*/}
              </dd>
            </div>
            {/*<div>*/}
            {/*  <dt className="sr-only">Category</dt>*/}
            {/*  <dd className="text-sm font-medium group-hover:text-light-blue-200 sm:mb-4 lg:mb-0 xl:mb-4">*/}
            {/*    Human Resources*/}
            {/*  </dd>*/}
            {/*</div>*/}
            <div className="col-start-2 row-start-1 row-end-3">
              <dt className="sr-only">Users</dt>
              <dd className="flex justify-end sm:justify-start lg:justify-end xl:justify-start -space-x-2">
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&amp;fit=facearea&amp;facepad=2&amp;w=48&amp;h=48&amp;q=80"
                  alt=""
                  width="48"
                  height="48"
                  className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white"
                  loading="lazy"
                />
                <img
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&amp;fit=facearea&amp;facepad=2&amp;w=48&amp;h=48&amp;q=80"
                  alt=""
                  width="48"
                  height="48"
                  className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white"
                  loading="lazy"
                />
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&amp;fit=facearea&amp;facepad=2&amp;w=48&amp;h=48&amp;q=80"
                  alt=""
                  width="48"
                  height="48"
                  className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white"
                  loading="lazy"
                />
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&amp;fit=facearea&amp;facepad=2&amp;w=48&amp;h=48&amp;q=80"
                  alt=""
                  width="48"
                  height="48"
                  className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white"
                  loading="lazy"
                />
                <img
                  src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&amp;fit=facearea&amp;facepad=2&amp;w=48&amp;h=48&amp;q=80"
                  alt=""
                  width="48"
                  height="48"
                  className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white"
                  loading="lazy"
                />
              </dd>
            </div>
          </dl>
          <div>...</div>
        </div>
      </Link>
    </div>
  );
}
