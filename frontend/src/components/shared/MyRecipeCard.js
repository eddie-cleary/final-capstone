import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import { IconButton } from '@mui/material';
import { DeleteOutlineOutlined, FavoriteSharp } from '@mui/icons-material';

export default function RecipeCard(recipe) {
    return (
    <Card elevation={5} sx={{height: 340, width: 330}}>
        <CardHeader
            action={
            <IconButton>
                <FavoriteSharp color="warning" sx={{marginRight: 1}}/>
            </IconButton> 
            }
            title={recipe.name}
            subheader={recipe.date} //Remove this line if want date omitted
            />
        <CardMedia 
        component="img"
        height="194"
        image={recipe.img}
        alt={recipe.imgAlt}
        />
        <CardActions sx={{display: "flex", justifyContent: "flex-end"}}>
            <IconButton>
                <DeleteOutlineOutlined />
            </IconButton>
        </CardActions>
    </Card>
    )
}