import { GA_MEASUREMENT_ID } from "../env";

export const pageview = (url: string) => {
    try {
        if (typeof window !== "undefined") {
            // @ts-ignore
            window.gtag("config", GA_MEASUREMENT_ID, {
                page_path: url,
            });
        }
    } catch (error) {}
};

export const event = ({ action, category, label, value }: any) => {
    try {
        if (typeof window !== "undefined") {
            // @ts-ignore
            window.gtag("event", action, {
                event_category: category,
                event_label: label,
                value,
            });
        }
    } catch (error) {}
};
