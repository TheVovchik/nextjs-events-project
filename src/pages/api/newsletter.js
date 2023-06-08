import { closeDB, connectDB, insertDoc } from '../../api/mongo/client';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      res.status(422).json({
        message: 'Invalid email address',
      });

      return;
    }

    try {
      await connectDB();
    } catch (error) {
      res.status(500).json({ error: 'Connecting to the database failed!'});
      return;
    }

    try {
      await insertDoc('emails', { email });

      res.status(201).json({
        message: 'Success',
      })
    } catch (error) {
      res.status(500).json({ error: 'Inserting data failed!'});
    }

    closeDB();
  }
}
