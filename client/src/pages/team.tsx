import { useList } from '@pankod/refine-core';
import { Box, Typography } from '@pankod/refine-mui';
import { TeamCard } from 'components';

const Agents = () => {
  const { data, isLoading, isError } = useList({
    resource:'users',
  })
  const allAgents = data?.data ?? [];
  if(isLoading) return <div>loading...</div>
  if(isError) return <div>error...</div>

  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142D">Team Member List</Typography>

      <Box
        mt="20px"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          backgroundColor: '#FCFCFC' }}
      >
        {allAgents.length > 0
        && allAgents?.map((agent) => (
          <TeamCard
            key={agent._id}
            id={agent._id}
            name={agent.name}
            email={agent.email}
            avatar={agent.avatar}
            noOfTasks={agent.allTasks.length}
          />
        ))}
      </Box>
    </Box>
  )
}

export default Agents

