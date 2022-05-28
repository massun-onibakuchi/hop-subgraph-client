import * as dotenv from 'dotenv'
import { createSubgraphClient } from '../src/subgraph'

dotenv.config()

async function main() {
  const endpoint = 'https://api.thegraph.com/subgraphs/name/perpetual-protocol/perpetual-v2-optimism'

  const client = createSubgraphClient(process.env.SUBGRAPH_URL || endpoint)

  // List tokens
  const { tokens } = await client.Tokens()
  console.log('tokens :>> ', tokens)

  const { tvl } = await client.Tvl({ id: tokens[0].id })
  console.log(`${tokens[0].name} tvl :${tvl}`)
}

main().catch(error => console.error(error))
