export type DomainForTable = {
  amount: string;
  id: string;
  name: string;
  onClick: (value: unknown) => Promise<void>;
  onCount: (value: unknown, count: number) => Promise<void>;
  years: number;
};

export type DomainsForTable = DomainForTable[];
