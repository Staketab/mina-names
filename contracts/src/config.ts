import { PrivateKey, PublicKey } from "o1js";
import {
  BLOCK_PRODUCER_PRIVATE_KEY,
  VALIDATOR_PRIVATE_KEY,
  CONTRACT_PRIVATE_KEY,
  FIRST_BLOCK_PRIVATE_KEY,
} from "../env.json";

interface ContractConfig {
  contractPrivateKey: PrivateKey;
  contractAddress: string;
  firstBlockPrivateKey?: PrivateKey;
  firstBlockPublicKey?: PublicKey;
}

export const nameContract: ContractConfig = {
  contractPrivateKey: PrivateKey.fromBase58(CONTRACT_PRIVATE_KEY),
  contractAddress: "B62qoYeVkaeVimrjBNdBEKpQTDR1gVN2ooaarwXaJmuQ9t8MYu9mDNS",

  firstBlockPrivateKey: PrivateKey.fromBase58(FIRST_BLOCK_PRIVATE_KEY),
  firstBlockPublicKey: PublicKey.fromBase58(
    "B62qio6DQCbqzvaPCxNbqE64nifFWacXLEQ9Cw7DUvx42Pe6D71NAME"
  ),
};

export const blockProducer = {
  publicKey: PublicKey.fromBase58(
    "B62qkuRTdKMsB2UgNKYTVCSLqMKuPupkreqCKuoNSUifkyP2jb7DFST"
  ),
  privateKey: PrivateKey.fromBase58(BLOCK_PRODUCER_PRIVATE_KEY),
};

export const validatorsPrivateKeys: PrivateKey[] = [
  PrivateKey.fromBase58(VALIDATOR_PRIVATE_KEY),
];
