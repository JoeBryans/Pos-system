import React from 'react'
import InventoryCard from '../components/inventory/Card';
import { GETInventory } from '../../../../actions/Inventory';

const page = async () => {
  const inventory = await GETInventory();
  console.log(inventory);
  return (
    <div>
      <InventoryCard inventory={inventory} />
    </div>
  );
}

export default page