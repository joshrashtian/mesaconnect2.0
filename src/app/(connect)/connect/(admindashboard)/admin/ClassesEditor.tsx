import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../../../../config/mesa-config";
import { ClassType } from "@/app/(connect)/connect/builder/(buildercomponents)/ClassRelations";
import LoadingObject from "@/(mesaui)/LoadingObject";

import { ClassesColumns } from "./(tables)/posts/columns";
import { DataTable } from "./(tables)/posts/datatable";
const ClassesEditor = () => {
  const [classes, setClasses] = useState<ClassType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const { data, error } = await supabase
          //@ts-ignore
          .schema("information")
          //@ts-ignore
          .from("classes")
          .select("*")
          .order("category", { ascending: true })
          .order("num", { ascending: true });
        if (error) {
          throw error;
        }
        setClasses(data as unknown as ClassType[]);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    fetchClasses();
  }, []);

  if (loading) return <LoadingObject />;
  if (error) return <div>{error.message}</div>;
  return (
    <div>
      <h1 className="text-2xl font-bold">Classes Editor</h1>
      <Separator />
      {JSON.stringify(classes[0])}
      <DataTable columns={ClassesColumns} data={classes} />
    </div>
  );
};

export default ClassesEditor;
