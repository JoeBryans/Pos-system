import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../../components/ui/tabs";

import { GetProducts } from "../../../../../actions/Products";
import { GETWareHouse } from "../../../../../actions/WareHouse";
import TransferStock from "./TransferStock";
import AddingStock from "./AddingStock";

export default async function page() {
  // get products and warehouse

  const [productData, warehouse] = await Promise.all([
    GetProducts(),
    GETWareHouse(),
  ]);
    const products=productData?.products;

  return (
    <div className="flex w-full flex-col gap-6">
      <Tabs defaultValue="recieve" className={"max-w-3xl w-full mx-auto"}>
        <TabsList
          className={
            "w-full h-12 bg-white dark:bg-gray-900 rounded-lg shadow-sm "
          }
        >
          <TabsTrigger value="recieve">New Adjustment</TabsTrigger>
          <TabsTrigger value="transfer">Transfer Stock</TabsTrigger>
        </TabsList>
        <TabsContent value="recieve">
          <AddingStock products={products} warehouse={warehouse} />
        </TabsContent>
        <TabsContent value="transfer">
          <TransferStock products={products} warehouse={warehouse} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
