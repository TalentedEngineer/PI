import { StarIcon } from "@heroicons/react/20/solid";

const TableBody = ({ tableData, columns }) => {
  return (
    <tbody>
      {tableData.map((data) => {
        return (
          <tr
            key={data.id}
            className="text-start hover:bg-gray-100 rounded cursor-pointer font-bold"
          >
            <td className="py-3 px-3 rounded-l-xl text-sm font-semibold">
              {data.s_no}
            </td>
            <td className="py-3 px-3">
              <span className="flex items-center gap-6">
                <img
                  src={data.collection.img}
                  alt=""
                  className="rounded-xl w-16 h-16 object-cover"
                />
                <span className="flex items-center gap-1">
                  <span>{data.collection.name}</span>
                  {data.collection.is_verified && (
                    <span className="text-blue-600">
                      <svg
                        fill="none"
                        height="16"
                        width="16"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          clipRule="evenodd"
                          d="M10.4521 1.31159C11.2522 0.334228 12.7469 0.334225 13.5471 1.31159L14.5389 2.52304L16.0036 1.96981C17.1853 1.52349 18.4796 2.2708 18.6839 3.51732L18.9372 5.06239L20.4823 5.31562C21.7288 5.51992 22.4761 6.81431 22.0298 7.99598L21.4765 9.46066L22.688 10.4525C23.6653 11.2527 23.6653 12.7473 22.688 13.5475L21.4765 14.5394L22.0298 16.004C22.4761 17.1857 21.7288 18.4801 20.4823 18.6844L18.9372 18.9376L18.684 20.4827C18.4796 21.7292 17.1853 22.4765 16.0036 22.0302L14.5389 21.477L13.5471 22.6884C12.7469 23.6658 11.2522 23.6658 10.4521 22.6884L9.46022 21.477L7.99553 22.0302C6.81386 22.4765 5.51948 21.7292 5.31518 20.4827L5.06194 18.9376L3.51687 18.6844C2.27035 18.4801 1.52305 17.1857 1.96937 16.004L2.5226 14.5394L1.31115 13.5475C0.333786 12.7473 0.333782 11.2527 1.31115 10.4525L2.5226 9.46066L1.96937 7.99598C1.52304 6.81431 2.27036 5.51992 3.51688 5.31562L5.06194 5.06239L5.31518 3.51732C5.51948 2.2708 6.81387 1.52349 7.99553 1.96981L9.46022 2.52304L10.4521 1.31159ZM11.2071 16.2071L18.2071 9.20712L16.7929 7.79291L10.5 14.0858L7.20711 10.7929L5.79289 12.2071L9.79289 16.2071C9.98043 16.3947 10.2348 16.5 10.5 16.5C10.7652 16.5 11.0196 16.3947 11.2071 16.2071Z"
                          fill="currentColor"
                          fillRule="evenodd"
                        />
                      </svg>
                    </span>
                  )}
                </span>
              </span>
            </td>
            <td className="py-3 px-3 text-right">
              {data.volume.value + " " + data.volume.currency}
            </td>
            <td
              className={
                "py-3 px-3 text-right " +
                (data.change.type === "increase"
                  ? "text-green-400"
                  : "text-red-500")
              }
            >
              {(data.change.type === "increase" ? "+" : "-") +
                data.change.value}
              %
            </td>
            <td className="py-3 px-3 text-right">
              {data.floor_price.value + " " + data.floor_price.currency}
            </td>
            <td className="py-3 px-3 text-right">{data.sales}</td>
            <td className="py-3 px-3 text-right rounded-r-xl">
              <button className="border-none m-0 p-0 transition-opacity">
                <StarIcon
                  fill="transparent"
                  stroke="black"
                  height={20}
                  width={20}
                  strokeWidth={2}
                  className="hover:opacity-75"
                />
              </button>
            </td>
          </tr>
        );

        // return (
        //   <tr key={data.id} className="text-start border">
        //     {columns.map(({ accessor }) => {
        //       const tData = data[accessor] ? data[accessor] : "-";
        //       console.log(tData);
        //       return (
        //         <td
        //           key={accessor}
        //           className={accessor === "s_no" ? "w-12" : ""}
        //         >
        //           {/* {tData} */}
        //         </td>
        //       );
        //     })}
        //     <td>
        //       <button className="border-none m-0 p-0 transition-opacity">
        //         <StarIcon
        //           fill="transparent"
        //           stroke="black"
        //           height={20}
        //           width={20}
        //           strokeWidth={2}
        //           className="hover:opacity-75"
        //         />
        //       </button>
        //     </td>
        //   </tr>
        // );
      })}
    </tbody>
  );
};

export default TableBody;
