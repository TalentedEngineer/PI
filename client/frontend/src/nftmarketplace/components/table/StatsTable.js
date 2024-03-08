import Table from "./Table";
import "../../styles/table.css";

const columns = [
  { label: "#", accessor: "s_no", sortable: false },
  { label: "Collection", accessor: "collection", sortable: true },
  { label: "Volume", accessor: "volume", sortable: true },
  { label: "% Change", accessor: "change", sortable: true },
  { label: "Floor price", accessor: "floor_price", sortable: true },
  { label: "Sales", accessor: "sales", sortable: true },
  // { label: "Sales", accessor: "star", sortable: true },
];

const data = [
  {
    id: 1,
    s_no: 1,
    collection: {
      name: "Bored Ape Yacht Club",
      img: "https://i.seadn.io/gae/lHexKRMpw-aoSyB1WdFBff5yfANLReFxHzt1DOj_sg7mS14yARpuvYcUtsyyx-Nkpk6WTcUPFoG53VnLJezYi8hAs0OxNZwlw6Y-dmI?auto=format&dpr=1&w=64",
      is_verified: true,
    },
    volume: {
      value: "11",
      currency: "ETH",
    },
    change: {
      value: 17,
      type: "increase",
    },
    floor_price: {
      value: 23.63,
      currency: "ETH",
    },
    sales: 13,
    // star: ,
  },
  {
    id: 2,
    s_no: 2,
    collection: {
      name: "The Potatoz",
      img: "https://i.seadn.io/gcs/files/129b97582f0071212ee7cf440644fc28.gif?auto=format&dpr=1&w=64",
      is_verified: false,
    },
    volume: {
      value: 54.2,
      currency: "ETH",
    },
    change: {
      value: 20,
      type: "decrease",
    },
    floor_price: {
      value: 0.08,
      currency: "PRIME",
    },
    sales: 2,
    // star: ,
  },
  {
    id: 3,
    s_no: 3,
    collection: {
      name: "Kanpai Pandas",
      img: "https://i.seadn.io/gae/s4Td3KYsUlCblO6lQKAGAWdKwsCuumcxYpebM_YL-Pex-BP886JYAWjKBLeB5StNopAAD6kVx3QHqWm9AmudXyCaCZszHbt8SdteEQ?auto=format&dpr=1&w=64",
      is_verified: true,
    },
    volume: {
      value: 54.2,
      currency: "ETH",
    },
    change: {
      value: 20,
      type: "decrease",
    },
    floor_price: {
      value: 0.08,
      currency: "PRIME",
    },
    sales: 2,
    // star: ,
  },
];

const StatsTable = () => {
  return (
    <>
      <div className="px-2">
        <Table
          caption="List of developers with an affordable course (has no default sorting)."
          data={data}
          columns={columns}
        />
      </div>
    </>
  );
};

export default StatsTable;
