
import {SHOW_ALERT} from "../constants/alert";

export function ShowAlert(head,content) {
    return { type: SHOW_ALERT, head:head,content:content};
}
