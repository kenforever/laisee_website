export default function Laisee({
  data,
}: {
  data:
    | [
        {
          tx_hash: string;
          laisee_amount: string;
          laisee_timestamp: string;
          laisee_count: string;
        }
      ]
    | [];
}) {
  return data?.length ? (
    data.map((x, i) => (
      <div
        className="flex gap-4 items-center py-2 border-t border-gray-100 bg-red-200 rounded-md px-4 my-2 "
        key={i}
      >
        <div className="flex-1 ">
          <p className="text-sm text-gray-500">利是編號：{x.laisee_count}</p>
          <p className="text-lg">利是金額：{x.laisee_amount} ETH</p>
          <p className="text-sm text-gray-500">
            timestamp: {x.laisee_timestamp}
          </p>
        </div>
        <div>
          <a
            href={`https://sepolia.etherscan.io/tx/${x.tx_hash}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500"
          >
            查看交易
          </a>
        </div>
      </div>
    ))
  ) : (
    <div className="text-center text-gray-500">你好像還沒開利是喔~</div>
  );
}
