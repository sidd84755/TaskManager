import { Card, Typography, Box, CardMedia, CardContent, Stack} from "@pankod/refine-mui";
import { Place } from "@mui/icons-material";
import { Link } from "@pankod/refine-react-router-v6";
import { PropertyCardProps } from "interfaces/property";

const TaskCard = ({ id, title, collaborators, deadline, photo, taskType }: PropertyCardProps) => {
  return (
    <Card
      component={Link}
      to={`/properties/show/${id}`}
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
      <Box sx={{height:"200px", width:"100%", borderRadius:"50%", padding:"25px"}}>
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
          <Typography fontSize={16} fontWeight={500} color="#11142d">
            {title}
          </Typography>
          <Stack direction="row" gap={0.5} alignItems="flex-start">
            <Place
              sx={{ fontSize: 18, color: '#11142d', marginTop: 0.5 }}
            />
            <Typography fontSize={14} color="#808191">{collaborators}</Typography>
            <Typography fontSize={14} color="#808191">{taskType}</Typography>
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
