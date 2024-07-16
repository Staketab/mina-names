import { useState } from "react";
import { connect, NatsConnection, KV } from "nats.ws";

type Statuses = {
  hash: string;
  statusTime: number;
  status: string;
}[];
const useZkcloudworkerWS = (): {
  startNats: (hash: string) => Promise<void>;
  statuses: Statuses;
  loading: boolean;
} => {
  const server = "wss://cloud.zkcloudworker.com:4223";
  //NEXT_PUBLIC_NATS_SERVER="wss://cloud.zkcloudworker.com:4223"
  const [tx, setTx] = useState<any[]>([]);
  const [nc, setNc] = useState<NatsConnection | undefined>(undefined);
  const [statuses, setStatuses] = useState<Statuses>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function watch(kv: KV, keys: string[]) {
    const iter = await kv.watch({ key: keys });
    setLoading(false);

    for await (const e of iter) {
      const item = JSON.parse(e.string());
      // console.log(`${e.key} @ ${e.revision} -> `, item);
      if (item.transaction) {
        setTx(JSON.parse(item.transaction));
        setStatuses((prevStatuses) => [
          ...prevStatuses,
          { status: item.status, statusTime: item.statusTime, hash: item.hash },
        ]);
      }
    }
  }

  const startNats = async (hash): Promise<void> => {
    if (nc === undefined) {
      const nc = await connect({
        servers: server,
      });

      setNc(nc);
      const js = nc.jetstream();
      const kv = await js.views.kv("profiles");
      watch(kv, [`zkcloudworker.rolluptx.${hash}`]);
    }
  };

  return {
    startNats,
    statuses: statuses.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.status === item.status)
    ),
    loading,
  };
};

export { useZkcloudworkerWS };
