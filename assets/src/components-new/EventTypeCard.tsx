import React, {useEffect} from 'react';

import {
  Card,
  ICardTokens,
  ICardSectionStyles,
  ICardSectionTokens,
} from '@fluentui/react-cards';
import {
  ActionButton,
  FontWeights,
  IButtonStyles,
  Icon,
  IIconStyles,
  Image,
  Persona,
  Stack,
  IStackTokens,
  Text,
  ITextStyles,
  DefaultButton,
} from '@fluentui/react';
import {useEvents} from './EventsProvider';

const alertClicked = (): void => {
  console.log('Clicked');
};

export default function EventTypeCard({eventTypeId}: any) {
  const {eventTypesById} = useEvents();
  const eventType = eventTypesById[eventTypeId];
  const {id, name, description, duration, url, kind, enabled} = eventType;

  // const cardTokens: ICardTokens = {childrenMargin: 12};
  const footerCardSectionTokens: ICardSectionTokens = {
    padding: '12px 0px 0px',
  };
  return (
    <div>
      <Card
        aria-label="Clickable vertical card with image bleeding at the center of the card"
        onClick={alertClicked}
        // tokens={cardTokens}
        // className="border-t-8 border-red-300 border-solid"
      >
        <Card.Item>
          <div className="h-2 bg-red-300 rounded-t" />
        </Card.Item>
        <Card.Item>
          <div className="flex flex-row justify-between px-4 pt-4">
            <i className="far fa-square  opacity-75 hover:opacity-100" />
            <div className="opacity-75 hover:opacity-100">
              <i className="fas fa-cog mr-1" />
              <i className="fas fa-caret-down" />
            </div>
          </div>
        </Card.Item>
        <Card.Item fill>
          <div className="px-4 py-4 border-b border-gray-300">
            <div className="text-xl">{name}</div>
            <div className="text-gray-500 text-sm opacity-75">
              {duration} mins, One-on-One
            </div>
          </div>
        </Card.Item>

        <Card.Section
          horizontal
          tokens={footerCardSectionTokens}
          className="px-4 pb-2"
        >
          <a
            href="#"
            className="block text-sm text-blue-500 hover:underline"
            role="menuitem"
          >
            /{url}
          </a>
          <Stack.Item grow={1}>
            <span />
          </Stack.Item>
          <DefaultButton text="Copy link" />
        </Card.Section>
      </Card>
    </div>
  );
}
