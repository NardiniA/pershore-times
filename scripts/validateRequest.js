export const validateRequest = (req, res) => {
    const { body: { event, model } } = req;
    if (event !== "entry.publish") {
        res.status(501).json({ message: "Entry event not implemented." });
    }
    if (model !== `newspaper-${process.env.STRAPI_ADMIN_LOCALE}` && model !== "blogs") {
        res
          .status(501)
          .json({
            message: "Model support not implemented.",
          });
    }
}