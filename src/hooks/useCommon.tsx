import { createContext, useState } from 'react';

const defaultCommon = {
  name: 'commonContext',
};
const [common, setCommon] = useState<any>(defaultCommon);

export const CommonConText = createContext(common);
