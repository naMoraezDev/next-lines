import { Header } from "@/components/Header";
import { ErrorNotFound } from "@/features/ErrorNotFound";

export default function Error() {
  return (
    <>
      <Header variant="404" />
      <ErrorNotFound />
    </>
  );
}
