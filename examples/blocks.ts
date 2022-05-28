import * as dotenv from 'dotenv'
import { createSubgraphClient } from '../src/subgraph'
import { Block_OrderBy, SubgraphBlockFragment } from '../src/generated/hop-subgraph-types'

dotenv.config()

async function main() {
  const endpoint = 'https://api.thegraph.com/subgraphs/name/hop-protocol/hop-mainnet'

  const client = createSubgraphClient(process.env.SUBGRAPH_URL || endpoint)

  // List blocks
  const blockHeight = 1500000
  const { blocks } = await client.Blocks({
    first: 5,
    block: { number_gte: blockHeight },
    orderBy: Block_OrderBy.Timestamp,
  })
  console.log('blocks :>> ', blocks)

  const block: SubgraphBlockFragment = blocks[0]
  console.log('block :>> ', block)
}

main().catch(error => console.error(error))
