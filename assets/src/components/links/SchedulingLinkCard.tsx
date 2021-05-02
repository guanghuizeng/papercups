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
        <div className="h-32 group cursor-pointer rounded-lg p-4 border border-gray-200 hover:bg-light-blue-500 hover:border-transparent hover:shadow-lg">
          <dl className="grid sm:block lg:grid xl:block grid-cols-2 grid-rows-2 items-center">
            <div className="pb-5">
              <dt className="sr-only">Title</dt>
              <dd className="leading-6 font-medium text-black group-hover:text-white">
                {schedulingLink?.name}
              </dd>
            </div>
            <div>{schedulingLink?.description}</div>
          </dl>
        </div>
      </Link>
    </div>
  );
}
