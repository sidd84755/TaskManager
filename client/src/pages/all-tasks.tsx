import { Add } from '@mui/icons-material';
import { useList } from '@pankod/refine-core';
import { Box, Stack, Typography } from '@pankod/refine-mui';
import { useNavigate } from '@pankod/refine-react-router-v6';
import { TaskCard,CustomButton } from 'components';

const AllTasks = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography fontSize={25} fontWeight={700} color="#11142d">
          All Tasks
        </Typography>
        <CustomButton
          title="Add Property"
          handleClick={() => navigate('/tasks/create')}
          backgroundColor="#475be8"
          color="#fcfcfc"
          icon={<Add/>}
        />
      </Stack>
    </Box>
  )
}

export default AllTasks
