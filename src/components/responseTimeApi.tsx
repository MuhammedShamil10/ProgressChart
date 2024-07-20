import { Table } from "flowbite-react";
import { InputData } from "../type";

type TableProp = {
  storeData: InputData | undefined;
};

export const ApiResponseTimeTable = ({ storeData }: TableProp) => {
  return (
    <div className="overflow-x-auto block">
      {storeData ? <Table>
        <Table.Head className="border dark:text-white dark:bg-gray-800">
          <Table.HeadCell className="border-r p-2">FROM DATE</Table.HeadCell>
          <Table.HeadCell className="border-r p-2">TO DATE</Table.HeadCell>
          <Table.HeadCell className="border-r p-2">RDS | TIMESCALE</Table.HeadCell>
          <Table.HeadCell className="border-r p-2">
            RESPONSE TIME
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {storeData?.map((item) => (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 ">
              <Table.Cell className="whitespace-nowrap border-r font-medium text-gray-900 dark:text-white p-2">
                {item.timeFrom}
              </Table.Cell>

              <Table.Cell className="whitespace-nowrap border-r font-medium text-gray-900 dark:text-white p-2 ">
                {item.timeTo}
              </Table.Cell>

              <Table.Cell className="whitespace-nowrap border-r font-medium text-gray-900 dark:text-white p-2">
                {item.RDS}
              </Table.Cell>

              <Table.Cell className="whitespace-nowrap border-r font-medium text-gray-900 dark:text-white p-2">
                {item.time}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table> : null}
    </div>
  );
};
