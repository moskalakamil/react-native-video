import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

export interface CustomSidebarProps {
  plan?: 'pro';
  badgeType?: 'planned' | 'new';
}

export type AddCustomProps<T> = T extends readonly (infer U)[]
  ? Array<AddCustomProps<U>>
  : T extends object
  ? Omit<{ [K in keyof T]: AddCustomProps<T[K]> }, 'customProps'> & { customProps?: CustomSidebarProps }
  : T;

export type TypedSidebarsConfig = AddCustomProps<SidebarsConfig>;

