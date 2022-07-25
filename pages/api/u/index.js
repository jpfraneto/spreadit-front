import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../lib/mongodb';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    let { db } = await connectToDatabase();
    try {
      const session = await getSession({ req });

      const checkUsername = await db
        .collection('users')
        .findOne({ username: req.body.username });
      if (checkUsername)
        return res.status(401).json({
          available: false,
          message: 'Ese nombre de usuario no está disponible',
        });
      const updatedMsg = await db
        .collection('users')
        .updateOne(
          { email: session.user.email },
          { $set: { username: req.body.username } }
        );
      return res.status(200).json({
        available: true,
        message: 'Tu nombre de usuario fue actualizado',
      });
    } catch (error) {
      console.log('the error is: ', error);
    }
  }
}
