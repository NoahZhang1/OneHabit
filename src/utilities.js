import {DateTime} from "luxon";

export default function valuesToPercentage(target, current) {

    return Math.floor(100 * ((1.0 * current) / (1.0 * target)));
}

export function today() {
    return DateTime.local().toSQLDate();
}