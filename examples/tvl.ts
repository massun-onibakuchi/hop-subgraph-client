import * as dotenv from 'dotenv'
import { createSubgraphClient } from '../src/subgraph'

dotenv.config()

async function main() {
  const endpoint = 'https://api.thegraph.com/subgraphs/name/hop-protocol/hop-mainnet'

  const client = createSubgraphClient(process.env.SUBGRAPH_URL || endpoint)

  // List tokens
  const { tokens } = await client.Tokens()
  console.log('tokens :>> ', tokens)

  const { tvls } = await client.Tvls()
  console.log('tvls :>> ', tvls)
}

main().catch(error => console.error(error))
