import { api } from "@/services/api";
import { useEffect } from "react";

export default function Lines() {
  useEffect(() => {
    async function getData() {
      const { data } = await api.get("/process.php?a=nc&p=%&t=o");
      console.log(data);
    }
    getData();
  }, []);
  return <h1>teste</h1>;
}
