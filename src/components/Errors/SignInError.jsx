import Alert from "@material-ui/lab/Alert";
import PropTypes from "prop-types";

export default function SignInError({ message }) {
  return <Alert severity="error">{message}</Alert>;
}

SignInError.propTypes = {
  message: PropTypes.string.isRequired,
};
