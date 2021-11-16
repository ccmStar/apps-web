// Copyright 2017-2021 @polkadot/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AccountId } from '@polkadot/types/interfaces';
import type { UseSudo } from './types';

import { useEffect, useState } from 'react';

import { createNamedHook } from './createNamedHook';
import { useAccounts } from './useAccounts';
import { useApi } from './useApi';
import { useCall } from './useCall';

const transformSudo = {
  // eslint-disable-next-line no-trailing-spaces
  transform: (key: AccountId) => { 
    console.log(key.toString());

    return key.toString();
  }
};

function useSudoImpl (): UseSudo {
  debugger;
  const { api } = useApi();
  const { allAccounts, hasAccounts } = useAccounts();
  const sudoKey = useCall<string>(hasAccounts && api.query.sudo?.key, undefined, transformSudo);

  console.log('sudo', sudoKey);
  const [hasSudoKey, setHasSudoKey] = useState(false);

  useEffect((): void => {
    console.log('结果', !!sudoKey && !!allAccounts && allAccounts.some((key) => key === sudoKey));
    setHasSudoKey(!!sudoKey && !!allAccounts && allAccounts.some((key) => key.toLocaleLowerCase() === sudoKey));
  }, [allAccounts, sudoKey]);

  return { allAccounts, hasSudoKey, sudoKey };
}

export const useSudo = createNamedHook('useSudo', useSudoImpl);
