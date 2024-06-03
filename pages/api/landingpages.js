import data from "@/db.json";

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      const { userId } = req.query;
      const filteredData = data.landingPages.filter(
        (page) => page.userId === userId
      );
      res.status(200).json(filteredData);
      break;
    case "POST":
      const newPage = req.body;
      newPage.id = Date.now().toString();
      data.landingPages.push(newPage);
      res.status(201).json(newPage);
      break;
    case "PATCH":
      const { id } = req.query;
      const updateIndex = data.landingPages.findIndex((page) => page.id === id);
      if (updateIndex !== -1) {
        data.landingPages[updateIndex] = {
          ...data.landingPages[updateIndex],
          ...req.body,
        };
        res.status(200).json(data.landingPages[updateIndex]);
      } else {
        res.status(404).json({ error: "Page not found" });
      }
      break;
    case "DELETE":
      const deleteIndex = data.landingPages.findIndex(
        (page) => page.id === req.query.id
      );
      if (deleteIndex !== -1) {
        const deletedPage = data.landingPages.splice(deleteIndex, 1);
        res.status(200).json(deletedPage);
      } else {
        res.status(404).json({ error: "Page not found" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PATCH", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
