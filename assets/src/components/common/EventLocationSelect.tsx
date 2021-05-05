import React, {Fragment} from 'react';

import Select from 'react-select';
import {colourOptions} from '../constants';

export default function SingleSelect(props: any) {
  const {defaultValue, onChange} = props;
  return (
    <Fragment>
      <Select
        defaultValue={colourOptions.find((opt) => opt.value === defaultValue)}
        className="w-full"
        classNamePrefix="select"
        isDisabled={false}
        isLoading={false}
        isClearable={false}
        isRtl={false}
        isSearchable={false}
        name="color"
        placeholder={'Add a location'}
        options={colourOptions}
        onChange={onChange}
        components={{
          ClearIndicator: null,
          IndicatorSeparator: null,
        }}
      />
    </Fragment>
  );
}
