export default async (req, res) => {
    console.log(req);
    res.status(200).json({ message: "API active!" });
}