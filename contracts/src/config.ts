import { PrivateKey, PublicKey } from "o1js";

interface ContractConfig {
  contractPrivateKey: PrivateKey;
  contractAddress: string;
  firstBlockPrivateKey?: PrivateKey;
  firstBlockPublicKey?: PublicKey;
}

export const nameContract: ContractConfig = {
  contractPrivateKey: PrivateKey.fromBase58(
    "EKEVjiMz5ogNynnKmLF1oRs6Wj5bZdW1itZgvpTQYaHrPnu3qFpG"
  ),
  contractAddress: "B62qnXXnnwnyUKbEBuQM64LEfNcBRzCkeNSCu3H4mhbe7ittQX2mDNS",

  firstBlockPrivateKey: PrivateKey.fromBase58(
    "EKDjCdQMYuc6F3XRRSmCaWYH1WiMUXHHQkvzgKBp9NnhA9PHGXwf"
  ),
  firstBlockPublicKey: PublicKey.fromBase58(
    "B62qpRmnH6SU4hZ9Z9JLm877SUaHSahFhu1nTwiPzJgmsZ2AsMnNAME"
  ),
};

export const blockProducer = {
  publicKey: PublicKey.fromBase58(
    "B62qrjVdai5dwVie36KGy5cYrLN9YfB2EJ5mRXSEVcnzrA3Q3AqNAME"
  ),
  privateKey: PrivateKey.fromBase58(
    "EKDqL5JFFqfL9UGUuUpJiDGnYWxdB1tmcYUbWH8iAxWSMkYs25bz"
  ),
};

export const validatorsPrivateKeys: PrivateKey[] = [
  PrivateKey.fromBase58("EKEdPmiFqHFXWdW2PSdEm3R2DbNrYX2JCZUW7ohkM5yfoGhMDX9b"),
];
