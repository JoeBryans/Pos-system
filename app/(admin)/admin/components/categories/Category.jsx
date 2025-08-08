"use client";
import React from 'react'
import { Button } from "../../../../../components/ui/button";
import { Input } from "../../../../../components/ui/input";
import { Label } from "../../../../../components/ui/label";
import {Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger} from "../../../../../components/ui/dialog";
import { PlusIcon } from 'lucide-react';
import { CreateCategory } from '../../../../../actions/Categories';
import { toast, Toaster } from 'sonner';
import { useRouter } from 'next/navigation';
const AddCategory = () => {
    const [name, setName] = React.useState("");
    const router=useRouter()
    const Submit = async (e) => {
        e.preventDefault()
      try {
          console.log(name);
          const res =await CreateCategory(name);
          //   setName("");
          console.log(res);
          if (res.ok) {
            router.replace("/admin/categories");  
           toast.success("Category created successfully");
          }
          else {
              toast.error("Category not created");
          }
    
      } catch (error) {
          console.log(error);
          toast.error("Category not created");
      }
    }
  return (
      <div>
          <Toaster />
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"primary"} size={"lg"} className={"cursor-pointer"}>
            <PlusIcon color="white" size={40} />
            Add New Category
          </Button>
        </DialogTrigger>
              <DialogContent className="md:max-w-4xl">
                  <div>
                      <Label htmlFor="category">Name</Label>
                      <Input id="category" defaultValue="Category" Placeholder="Category"
                      onChange={(e) => setName(e.target.value)}
                      />
                  </div>
                  <DialogFooter>
                      <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button type="submit"
                      onClick={Submit}
                      >Create</Button>
                      </DialogFooter>
              </DialogContent>
              
      </Dialog>
    </div>
  );
}

export default AddCategory;