import * as dotenv from 'dotenv'
import { createSubgraphClient } from '../src/subgraph'
import { Transfer_OrderBy, OrderDirection, SubgraphTransferFragment } from '../src/generated/hop-subgraph-types'

dotenv.config()

async function main() {
  const endpoint = 'https://api.thegraph.com/subgraphs/name/hop-protocol/hop-mainnet'

  const client = createSubgraphClient(process.env.SUBGRAPH_URL || endpoint)

  // List transfers
  const { transfers } = await client.Transfers({
    first: 2,
    orderBy: Transfer_OrderBy.Value,
    orderDirection: OrderDirection.Desc,
  })
  console.log('transfers :>> ', transfers)

  const transfer: SubgraphTransferFragment = transfers[0]
}

main().catch(error => console.error(error))
