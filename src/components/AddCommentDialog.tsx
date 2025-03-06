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
import { addCommentSlice, editCommentSlice } from "../store/blog/blogSlice";

interface AddCommentDialogProps {
  blogId: string;
  open: boolean;
  handleClose: () => void;
  editCommentDetails?: any;
}

const AddCommentDialog: React.FC<AddCommentDialogProps> = ({
  blogId,
  open,
  handleClose,
  editCommentDetails,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [comment, setComment] = React.useState("");
  const addComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (editCommentDetails) {
      const res = await dispatch(
        editCommentSlice({
          comment,
          id: blogId,
          commentId: editCommentDetails._id,
        })
      );
      if (res?.type === "edit/comment/fulfilled") {
        handleClose();
      }
    } else {
      const res = await dispatch(addCommentSlice({ comment, id: blogId }));
      if (res?.type === "add/comment/fulfilled") {
        handleClose();
      }
    }
  };

  React.useEffect(() => {
    if (editCommentDetails) {
      setComment(editCommentDetails?.comment);
    } else {
      setComment("");
    }
  }, [editCommentDetails]);

  return (
    <React.Fragment>
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
        <DialogTitle>
          {editCommentDetails ? "Edit" : "Add a"} Comment
        </DialogTitle>
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
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">{editCommentDetails ? "Edit" : "Add"}</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AddCommentDialog;
