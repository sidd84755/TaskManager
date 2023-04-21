import { useOne } from '@pankod/refine-core';
import { useParams } from '@pankod/refine-react-router-v6';

import { Profile } from 'components';

const MemberProfile = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useOne({
    resource: 'users',
    id: id as string,
  });

  const agentProfile = data?.data ?? [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  return (
    <Profile
      type="Team Member"
      name={agentProfile?.name}
      avatar={agentProfile?.avatar}
      email={agentProfile?.email}
      tasks={agentProfile?.allTasks}
    />
  );
};

export default MemberProfile;
