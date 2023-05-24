import { Box} from "@material-ui/core";

import Safe from "../components/Safe";

const SetUpPage = () => {
    return (
        <Box sx={{
            minHeight: "50vh",
            display: "flex",
            alignItems: 'center',
        }}>
            <Safe />
        </Box>
    )
}

export default SetUpPage;