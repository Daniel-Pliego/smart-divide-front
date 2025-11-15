import { MONTHS } from "@/shared/constants";

type DateFormat = "full" | "short";

export function formatDate(
  input: Date | string | number,
  format: DateFormat = "full"
): string {
  const date = input instanceof Date ? input : new Date(input);

  if (isNaN(date.getTime())) {
    throw new Error("Fecha inválida");
  }

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  if (format === "full") {
    return `${day} de ${MONTHS[monthIndex].full} de ${year}`;
  }

  if (format === "short") {
    return `${day} ${MONTHS[monthIndex].short}`;
  }

  throw new Error("Formato no válido");
}
