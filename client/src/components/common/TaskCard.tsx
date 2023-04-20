import { Card, Typography, Box, CardMedia, CardContent, Stack} from "@pankod/refine-mui";
import { Groups2Outlined, AssignmentTurnedInOutlined, AccountCircleOutlined } from "@mui/icons-material";
import { Link } from "@pankod/refine-react-router-v6";
import { PropertyCardProps } from "interfaces/property";

const TaskCard = ({ id, title, collaborators, deadline, photo, taskType, nickname }: PropertyCardProps) => {
  return (
    <Card
      component={Link}
      to={`/tasks/show/${id}`}
      sx={{
        maxWidth: '330px',
        padding: '10px',
        '&:hover' : {
          boxShadow: '0 22px 45px 2px rgba(176, 176, 176, 0.1)'
        },
        cursor: 'pointer',
        textDecoration: 'none',
      }}
      elevation={0}
    >
      <Box sx={{display:"flex", flexFlow:"row", gap: 2, textTransform:"capitalize"}}>
              <AccountCircleOutlined
                sx={{ fontSize: 20, color: '#11142d', marginTop: 0.5 }}
              />
              <Typography fontSize={16} color="#808191">{nickname}</Typography>
            </Box>
      <Box sx={{height:"230px", width:"230px", padding:"25px"}}>
      <CardMedia
        component="img"
        width="100%"
        height="100%"
        image={photo}
        alt="card image"
        sx={{ borderRadius: '50%' }}
      />
      </Box>
      <CardContent sx={{ display: 'flex', flexDirection: 'row', paddingX: '5px', justifyContent: 'space-between'}}>
        <Stack direction="column" gap={1}>
          <Typography fontSize={18} fontWeight={500} color="#11142d">
            {title}
          </Typography>
          <Stack direction="column" gap={0.5} alignItems="flex-start">
            <Box sx={{display:"flex", flexFlow:"row", gap: 2, textTransform:"capitalize"}}>
              <Groups2Outlined
                sx={{ fontSize: 20, color: '#11142d', marginTop: 0.5 }}
              />
              <Typography fontSize={16} color="#808191">{collaborators}</Typography>
            </Box>
            <Box sx={{display:"flex", flexFlow:"row", gap: 2, textTransform:"capitalize"}}>
              <AssignmentTurnedInOutlined
                sx={{ fontSize: 20, color: '#11142d', marginTop: 0.5 }}
              />
              <Typography fontSize={16} color="#808191">{taskType}</Typography>
            </Box>
          </Stack>
        </Stack>
        <Box px={1.5} py={0.5} borderRadius={1} bgcolor="#dadefa" height="fit-content">
          <Typography fontSize={12} fontWeight={600} color="#475be8">
            {deadline}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default TaskCard
