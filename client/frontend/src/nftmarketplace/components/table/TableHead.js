import { useState } from "react";
const TableHead = ({ columns, handleSorting }) => {
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");

  const handleSortingChange = (accessor) => {
    const sortOrder =
      accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
  };

  return (
    <thead className="sticky top-0 bg-white">
      <tr>
        {columns.map(({ label, accessor, sortable }) => {
          const img =
            sortField === accessor && order === "asc"
              ? "up_arrow.png"
              : sortField === accessor && order === "desc"
              ? "down_arrow.png"
              : "default.png";

          return (
            <th
              key={accessor}
              onClick={sortable ? () => handleSortingChange(accessor) : null}
              className="p-3 py-5"
            >
              <div
                className={
                  "flex font-normal text-sm text-gray-500 items-center cursor-pointer " +
                  (accessor !== "collection" && accessor !== "s_no"
                    ? "justify-end"
                    : "justify-start")
                }
              >
                <span>{label}</span>
                {sortable ? (
                  <span>
                    <img src={require(`../../assets/table/${img}`)} alt={img} />
                  </span>
                ) : null}
              </div>
            </th>
          );
        })}
        <th></th>
      </tr>
    </thead>
  );
};

export default TableHead;
