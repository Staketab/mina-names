import { Cloud, zkCloudWorker, initBlockchain } from "zkcloudworker";
import { DomainNameServiceWorker } from "./src/worker";

export async function zkcloudworker(cloud: Cloud): Promise<zkCloudWorker> {
  console.log("zkcloudworker cloud chain:", cloud.chain);
  await initBlockchain(cloud.chain);
  return new DomainNameServiceWorker(cloud);
}
