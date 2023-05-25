import { 
    Grid, 
    GridProps,
    Typography, 
    IconButton, 
    Button,
    makeStyles,
    Divider,
    Box,
 } from "@material-ui/core"
import DeleteIcon from '@material-ui/icons/Delete';
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { moneyBox } from "./Safe";


type MoneyBoxProps = {
    box: moneyBox,
    deleteMoneyBox: (id: string) => void
}

const useStyles = makeStyles({
    centered: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      padding: "10px"
    },
  });

  export const CenteredGridItem = ({ children, ...props }: GridProps) => {
    const classes = useStyles();
  
    return (
      <Grid item className={classes.centered} {...props}>
        {children}
      </Grid>
    );
  }
const MoneyBox = ({box, deleteMoneyBox}: MoneyBoxProps) => {
    const {id, name, percent, onMoneyArrival} = box;
    return (
        <>
        <Grid 
        container 
        item >
            <CenteredGridItem xs={4}>
                <Typography variant="h5">Money Box Name</Typography>
                <Typography variant="h5">{name}</Typography>
            </CenteredGridItem>
            <CenteredGridItem  xs={2}>
            <Typography variant="h5">%</Typography>
            <Typography variant="h5">{percent} %</Typography>
            </CenteredGridItem>
            <CenteredGridItem xs={4}>
                <Typography variant="h5">On Money Arrival</Typography>
                <Button
                disabled
                variant="outlined"
                endIcon={<KeyboardArrowDownIcon />}
                >
                {onMoneyArrival}
                </Button>
            </CenteredGridItem>
            <CenteredGridItem xs={2}>
            <IconButton
            onClick={() => deleteMoneyBox(id)}
            color="secondary"
            >
               <DeleteIcon />
            </IconButton>
            </CenteredGridItem>
            <Grid item xs={12} >
            <Divider/>
            </Grid>
        </Grid>
        </>
    )
}

export default MoneyBox;