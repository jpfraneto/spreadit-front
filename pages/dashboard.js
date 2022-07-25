import React from 'react';
import { useSession } from 'next-auth/react';

const Dashboard = () => {
  const { data: session } = useSession();
  const handleCreateAlert = async () => {};
  if (!session)
    return (
      <div>
        How could you access a dashboard if you are not logged in as a user?
      </div>
    );
  return (
    <div>
      Here is the dashboard for the user {session.user.username}
      <button onClick={handleCreateAlert}>Create alert</button>
    </div>
  );
};

export default Dashboard;
