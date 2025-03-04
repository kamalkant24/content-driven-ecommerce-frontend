import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
import { addCommentSlice } from "../store/blog/blogSlice";

interface AddCommentDialogProps {
  blogId: string;
}

const AddCommentDialog: React.FC<AddCommentDialogProps> = ({ blogId }) => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const commentJson = Object.fromEntries((formData as any).entries());
    const res = await dispatch(addCommentSlice({ commentJson, id: blogId }));
    if (res?.type === "add/comment/fulfilled") {
      handleClose();
    }
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add a Comment
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: addComment,
          },
        }}
      >
        <DialogTitle>Add a Comment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Write Your Comment Below.
          </DialogContentText>
          <DialogContentText>
            Note: It would be visible to everyone.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            blogId="name"
            name="comment"
            label="Comment"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AddCommentDialog;
