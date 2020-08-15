import { makeStyles, createStyles, Theme } from "@material-ui/core";

export const userProfileStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "45rem",
            height: "31rem",
            borderRadius: "1.7rem",
            justifyContent: "center",
        },
        avatar: {
            width: "10rem",
            height: "10rem",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            color: "#000",
            position: "relative",
            margin: "0 auto",
            marginTop: "-7rem"
        },
        userName: {
            margin: "0 autp",
            textAlign: "center",
            marginTop: "1rem",
            marginBottom: "1rem",

        }
    })
)