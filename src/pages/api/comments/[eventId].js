import { closeDB, connectDB, getCollectionItem, insertDoc } from "../../../api/mongo/client";

export default async function handler(req, res) {
  const { eventId } = req.query;

  if (req.method === 'POST') {
    const { email, name, text } = req.body;

    if (!email
      || !email.includes('@')
      || !name
      || !name.trim()
      || !text
      || !text.trim()
    ) {
      res.status(422).json({
        message: 'Invalid input',
      });

      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    }

    try {
      await connectDB();
    } catch (error) {
      res.status(500).json({ error: 'Connecting to the database failed!'});
      return;
    }


    try {
      const result = await insertDoc('comments', newComment);

      res.status(201).json({
        message: 'Success',
        comment: result,
      })
    } catch (error) {
      res.status(500).json({ error: 'Inserting data failed!'});
    }
  }

  if (req.method === 'GET') {
    try {
      await connectDB();
    } catch (error) {
      res.status(500).json({ error: 'Connecting to the database failed!'});
      return;
    }

    try {
      const result = await getCollectionItem('comments', { eventId });

      res.status(200).json({
        message: 'Success',
        comments: result,
      })
    } catch (error) {
      res.status(500).json({ error: 'Fetching data failed!'});
    }
  }

  closeDB();
}
