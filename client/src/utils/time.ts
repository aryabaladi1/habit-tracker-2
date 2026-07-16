export function minutesToTime(
    minutes: number,
    options?: {
        includeSign?: boolean;
    }
): string {
    const includeSign = options?.includeSign ?? false;

    const sign = minutes > 0 ? "+" : minutes < 0 ? "-" : "";
    const absolute = Math.abs(minutes);

    const hours = Math.floor(absolute / 60);
    const mins = absolute % 60;

    return `${includeSign ? sign : ""}${hours
        .toString()
        .padStart(2, "0")}:${mins
        .toString()
        .padStart(2, "0")}`;
}