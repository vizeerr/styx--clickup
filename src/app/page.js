import { columns } from "@/components/Columns";
import { DataTable } from "@/components/DataTable";
import Image from "next/image";

async function getData() {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ];
}

export default async function Home() {
  const data = await getData();

  return (
   <main>
    <DataTable columns={columns} data={data}/>

   </main>
  );
}
