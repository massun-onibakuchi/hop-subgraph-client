export enum ChainId {
  Mainnet = 1,
  Optimism = 10,
}

export const NETWORKS = {
  [ChainId.Mainnet]: 'mainnet',
  [ChainId.Optimism]: 'optimism',
}
