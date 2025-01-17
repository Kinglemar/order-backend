export function parseDate(timezone?: any) {
  let resolve = timezone;
  const format = new Intl.DateTimeFormat("en-GB", {
    timeZone: resolve || "Africa/Lagos",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  }).format(new Date());

  const formatT = format.trim().split(", ").join("T");
  const half = formatT.split("T")[0];
  const second = formatT.split("T")[1];
  const reverse = half
    .split("/")
    .reverse()
    .join("-")
    .split("-")
    .map((e) => {
      const num = Number(e);
      if (num < 9) {
        return "0" + num.toString();
      }
      return num.toString();
    })
    .join("-");

  return reverse + "T" + second;
}
