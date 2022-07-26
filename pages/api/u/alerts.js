import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../lib/mongodb';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    let { db } = await connectToDatabase();
    try {
      const session = await getSession({ req });

      const user = await db
        .collection('users')
        .findOne({ username: req.body.username });
      console.log('the user is: ', user);

      return res.status(200).json({
        available: true,
        message: 'Tu nombre de usuario fue actualizado',
      });
    } catch (error) {
      console.log('the error is: ', error);
    }
  }
  if (req.method === 'POST') {
    try {
      let { db } = await connectToDatabase();
      const session = await getSession({ req });
      console.log('the session is: ', session);
      // const user = await db
      //   .collection('users')
      //   .findOne({ username: req.body.username });
      const updateUser = await db
        .collection('users')
        .updateOne(
          { username: session.user.username },
          { $push: { alerts: req.body.newAlert } }
        );
      console.log('the updatedUser message is: ', updateUser);
      res.status(200).json({ 123: 456 });
    } catch (error) {
      res.status(500).json({ message: 'There was an error sending the data.' });
    }
  }
}
