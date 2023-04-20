import { Typography, Box, Stack } from "@pankod/refine-mui";
import { useDelete, useGetIdentity, useShow } from "@pankod/refine-core";
import { useParams, useNavigate } from "@pankod/refine-react-router-v6";
import { ChatBubble, Delete, Edit, Phone, Groups2Outlined, Place } from "@mui/icons-material";
import { CustomButton } from 'components';

const TaskDetails = () => {

  const navigate = useNavigate();
  const { data: user } = useGetIdentity();
  const { id } = useParams();
  const { mutate } = useDelete();
  const { queryResult } = useShow();
  const { data, isLoading, isError } = queryResult;
  const propertyDetails = data?.data ?? {};

  if(isLoading) return <div>Loading...</div>
  if(isError) return <div>Error</div>

  const isCurrentUser = user.email === propertyDetails.creator.email;

  const handleDeleteProperty = () => {
    // eslint-disable-next-line no-restricted-globals
    const response = confirm('Are you sure you want to delete this task?');
    if (response) {
      mutate({
        resource: 'tasks',
        id: id as string,
      });

      navigate('/tasks');
    }
  };

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="row"
      justifyContent="center"
    >
    <Box
      borderRadius="15px"
      padding="20px"
      bgcolor="#FCFCFC"
      width="fit-content"
    >
      <Typography fontSize={25} fontWeight={700} color="#11142D">Details</Typography>

      <Box mt="20px" display="flex" flexDirection={{ xs: 'column', lg: 'row' }} gap={4}>

        <Box flex={1} maxWidth={764}>

          <Box mt="15px">
            <Stack direction="column"  flexWrap="wrap">
              <Typography fontSize={22} fontWeight={600} mt="10px" color="#11142D">Title : {propertyDetails.title}</Typography>
              <Typography fontSize={18} fontWeight={500} color="#11142D" textTransform="capitalize">Type : {propertyDetails.taskType}</Typography>
              
            </Stack>

            <Stack direction="row" flexWrap="wrap" justifyContent="space-between" alignItems="center" gap={2}>
              <Box>
                <Stack mt={0.5} direction="row" alignItems="center" gap={1}>
                  <Groups2Outlined sx={{ color: '#808191' }} />
                  <Typography fontSize={14} color="#808191">{propertyDetails.collaborators}</Typography>
                </Stack>
              </Box>

              <Box>
                <Typography fontSize={16} fontWeight={600} mt="10px" color="#11142D">Deadline</Typography>
                <Stack direction="row" alignItems="flex-end" gap={1}>
                  <Typography fontSize={25} fontWeight={700} color="#FF6D60">{propertyDetails.deadline}</Typography>
                </Stack>
              </Box>
            </Stack>

            <Stack mt="25px" direction="column" gap="10px">
              <Typography fontSize={18} color="#11142D">Description</Typography>
              <Typography fontSize={14} color="#808191">
                {propertyDetails.description}
              </Typography>
            </Stack>
          </Box>
        </Box>

        <Box width="100%" flex={1} maxWidth={326} display="flex" flexDirection="column" gap="20px">
          <Stack
            width="100%"
            p={2}
            direction="column"
            justifyContent="center"
            alignItems="center"
            border="1px solid #E4E4E4"
            borderRadius={2}
          >

            <Stack mt={2} justifyContent="center" alignItems="center" textAlign="center">
              <img
                src={propertyDetails.creator.avatar}
                width={90}
                height={90}
                style={{ borderRadius: '100%', objectFit: 'cover' }}
                alt="avatar"
              />

              <Box mt="15px">
                <Typography fontSize={18} fontWeight={600} color="#11142D">{propertyDetails.creator.name}</Typography>
                <Typography mt="5px" fontSize={14} fontWeight={400} color="#808191">Developer</Typography>
              </Box>

              <Stack mt="15px" direction="row" alignItems="center" gap={1}>
                <Place sx={{ color: '#808191' }} />
                <Typography fontSize={14} fontWeight={400} color="#808191">India</Typography>
              </Stack>

              <Typography mt={1} fontSize={16} fontWeight={600} color="#11142D">{propertyDetails.creator.allTasks.length} Tasks</Typography>
            </Stack>

            <Stack width="100%" mt="25px" direction="row" flexWrap="wrap" gap={2}>
              <CustomButton
                title={!isCurrentUser ? 'Message' : 'Edit'}
                backgroundColor="#475BE8"
                color="#FCFCFC"
                fullWidth
                icon={!isCurrentUser ? <ChatBubble /> : <Edit />}
                handleClick={() => {
                  if (isCurrentUser) {
                    navigate(`/tasks/edit/${propertyDetails._id}`);
                  }
                }}
              />
              <CustomButton
                title={!isCurrentUser ? 'Call' : 'Delete'}
                backgroundColor={!isCurrentUser ? '#2ED480' : '#d42e2e'}
                color="#FCFCFC"
                fullWidth
                icon={!isCurrentUser ? <Phone /> : <Delete />}
                handleClick={() => {
                  if (isCurrentUser) handleDeleteProperty();
                }}
              />
            </Stack>
          </Stack>

        </Box>
      </Box>
    </Box>
    </Box>
  );
};

export default TaskDetails

