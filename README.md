# Hop Protocol Subgraph Client

🛠 An JavaScript Subgraph Client for Hop Protocol

[The Graph](https://thegraph.com/en/) is an indexing protocol for querying networks like Ethereum and IPFS. Anyone can build and publish open APIs, called subgraphs, making data easily accessible.

[Hop Protocol](https://hop.exchange/) is a scalable rollup-to-rollup general token bridge. It allows users to send tokens from one rollup or sidechain to another almost immediately without having to wait for the networks challenge period.

[Hop Protocol Mainnet Subgraph](https://thegraph.com/explorer/subgraph?id=Cjv3tykF4wnd6m9TRmQV7weiLjizDnhyt6x2tTJB42Cy&view=Overview)

[Hop Subgraph Playground](https://api.thegraph.com/subgraphs/name/hop-protocol/hop-mainnet/graphql)

## 💁Getting Started

### ✨To use Hop Subgraph Clients :

Install the lib using npm or yarn

```bash
yarn add hop-subgraph-client
```

---

## ✨Subgraph Queries

```typescript
import { createSubgraphClient } from 'hop-subgraph-client'
const SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/hop-protocol/hop-mainnet'
const client = createSubgraphClient(SUBGRAPH_URL)
```

#### To list transfers

```typescript
import { Transfer_OrderBy, OrderDirection } from 'hop-subgraph-client'
// List transfers
const { transfers } = await client.Transfers({
  first: 2,
  orderBy: Transfer_OrderBy.Value,
  orderDirection: OrderDirection.Desc,
})
```

#### To list tokens and TVL

```typescript
const { tokens } = await client.Tokens()
const { tvls } = await client.Tvls()
console.log('tokens :>> ', tokens)
console.log('tvls :>> ', tvls)
```

More examples are [here](./examples/)

---

## 🔧Contributing

Created an `.env` file with a env variable:

```bash
# https://api.thegraph.com/subgraphs/name/hop-protocol/hop-<mainnet, optimism...>
SUBGRAPH_URL=<HOP_SUBGRAPH_URL>
```

For local developement you can run

```bash
yarn dev
```

For production build:

```bash
yarn build
```

Which will generate a production build on "dist" folder.

To run tests type:

```bash
yarn test
```

## Adding new queries

Refer to any existing query in the `graphql` directory as a reference when first getting started.

1. Add the query to an existing `.graphql` file or create a new one in the `graphql` directory.
2. Run `yarn gen:subgraph`
3. Access the query from the generated client using `client.QueryName`

All queries get exactly typed, so if you query a partial reference to an underlying model, only the quereied fields will be available. If you need to reference the type created by the query, create a fragment and use that fragment in your query.

```graphql
fragment SubgraphBlock on Block {
  id
  author
  gasLimit
  difficulty
  gasUsed
  hash
  number
  parentHash
  receiptsRoot
  size
  timestamp
  transactionsRoot
  unclesHash
  totalDifficulty
  stateRoot
}

query Block($id: ID!, $block: Block_height) {
  block(id: $id) {
    ...SubgraphBlock
  }
}
```

The generated type will be exported from the module suffixed with `Fragment`. So in this example, your type is named: `SubgraphBlockFragment`.

```ts
import { SubgraphBlockFragment, Block_OrderBy } from 'hop-subgraph-client'

// List blocks
const { blocks } = await client.Blocks({
  first: 5,
  block: { number_gte: blockHeight },
  orderBy: Block_OrderBy.Timestamp,
})

const block: SubgraphMarketFragment = blocks[0]
```

## Resync the schema

Anytime there are schema changes published to `hop-mainnet-subgraph`, you'll need to resync the local schema by running `yarn gen:subgraph`.

If the update introduced breaking changes, running `yarn gen:subgraph` will fail and print the necessary changes that need to be made to the console.

## Disclaimer

This is experimental software and is provided on an "as is" and "as available" basis.

We do not give any warranties and will not be liable for any loss incurred through any use of this codebase.

This is 3rd party code, use at your YOUR OWN RISK ⚠️
