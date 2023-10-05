import { Connection, Client } from '@temporalio/client';
import { example, showStarWars } from './workflows';
import { nanoid } from 'nanoid';

async function run() {
  // Connect to the default Server location
  const connection = await Connection.connect({ address: 'localhost:7233' });
  // In production, pass options to configure TLS and other settings:
  // {
  //   address: 'foo.bar.tmprl.cloud',
  //   tls: {}
  // }

  const client = new Client({
    connection,
    // namespace: 'foo.bar', // connects to 'default' namespace if not specified
  });

  /*
  const handle = await client.workflow.start(example, {
    taskQueue: 'hello-world',
    // type inference works! args: [name: string]
    args: ['Temporal'],
    // in practice, use a meaningful business ID, like customerId or transactionId
    workflowId: 'workflow-' + nanoid(),
  });
  */

  const testCase = '[{"propertyName":"eye_color","operator":"=","value":"red"},{"propertyName":"name","operator":"@","value":"containsNum"}]';

  const handle = await client.workflow.start(showStarWars, {
    taskQueue: 'hello-world',
    // type inference works! args: [name: string]
    args: [testCase],
    // in practice, use a meaningful business ID, like customerId or transactionId
    workflowId: 'workflow-' + nanoid(),
  });

  console.log(`Started workflow ${handle.workflowId}`);

  // optional: wait for client result
  console.log(await handle.result());
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
