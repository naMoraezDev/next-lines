import { useTheme } from "@/shared/hooks/useTheme";
import { Flex, Select, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ChangeEvent } from "react";

type FilterSelectProps = {
  filter: string;
};

export function FilterSelect({ filter }: FilterSelectProps) {
  const router = useRouter();
  const { isDark } = useTheme();

  function handleSelectFilter(event: ChangeEvent<HTMLSelectElement>) {
    const filter = event.target.value;
    if (filter !== "buses" && filter !== "lotations") {
      router.push(`/lines/all`);
      return;
    }

    router.push(`/lines/filter?filter=${filter}`);
  }

  return (
    <Flex alignSelf="flex-end" align="center" gap="15">
      Filtrar por:
      <Select
        focusBorderColor="green.400"
        ringColor="green.400"
        borderColor="green.400"
        border="none"
        cursor="pointer"
        w={200}
        onChange={(e) => handleSelectFilter(e)}
        value={filter}
      >
        <option value="all" style={{ color: "gray" }}>
          Todos
        </option>
        <option value="buses" style={{ color: "gray" }}>
          Ônibus
        </option>
        <option value="lotations" style={{ color: "gray" }}>
          Lotação
        </option>
      </Select>
    </Flex>
  );
}
