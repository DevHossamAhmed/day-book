import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import advancedFormat from "dayjs/plugin/advancedFormat";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(advancedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
const timeZone = "Asia/Riyadh";

export const formatDate = (date: Date, format: string = "YYYY-MM-DD"): string => {
    return dayjs(date).tz(timeZone).format(format);
}

export const getDateByLabel = (label: string): string => {
    const base = dayjs().tz(timeZone);

    if (label === "yesterday") return base.subtract(1, "day").format("YYYY-MM-DD");
    if (label === "tomorrow") return base.add(1, "day").format("YYYY-MM-DD");

    return base.format("YYYY-MM-DD");
}