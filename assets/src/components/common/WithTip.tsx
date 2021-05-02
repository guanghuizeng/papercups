import * as React from 'react';
import * as TooltipCore from '@radix-ui/react-tooltip';

function WithTip({children, content}: any) {
  return (
    <TooltipCore.Root>
      <TooltipCore.Trigger>{children}</TooltipCore.Trigger>
      <TooltipCore.Content className="bg-black text-white py-1 px-2 rounded text-sm font-bold">
        {content}
      </TooltipCore.Content>
    </TooltipCore.Root>
  );
}

export default WithTip;
