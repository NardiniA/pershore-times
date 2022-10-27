export default function handler(req, res) {
    if (req.method === "POST") {
        res.status(200).json({ name: "John Doe" });
    } else {
        res.status(405).json({ message: "Invalid Method" });
    }
}