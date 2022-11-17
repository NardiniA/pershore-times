import { sendNewspaper } from "scripts/send-newspaper";
import { validateRequest } from "scripts/validateRequest";

export default async (req, res) => {
    validateRequest(req, res);
    const payload = sendNewspaper(req?.body?.entry);
    res.status(200).json({ message: "Finished", payload: payload });
}