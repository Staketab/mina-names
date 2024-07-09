import { describe, expect, it } from "@jest/globals";
import { setNumberOfWorkers, VerificationKey, Cache } from "o1js";
import { blockchain, Memory, initBlockchain } from "zkcloudworker";
import { MapUpdate } from "../src/rollup/transaction";

setNumberOfWorkers(8);
const chain: blockchain = "local" as blockchain;
let mapVerificationKey: VerificationKey;

describe("Domain Name Service Contract", () => {
  it(`should compile contract`, async () => {
    await initBlockchain(chain);
    console.log("Compiling contracts...");
    const cache: Cache = Cache.FileSystem("./cache");
    console.time("MapUpdate compiled");
    mapVerificationKey = (await MapUpdate.compile({ cache })).verificationKey;
    console.timeEnd("MapUpdate compiled");
    console.log("MapUpdate verification key", mapVerificationKey.hash.toJSON());
    Memory.info("compiled");
  });
});
