import { useNavigate } from "react-router-dom";
import Button from "./Button";

function ButtonBack() {
  const navigate = useNavigate();

  return (
    <Button
      handleClick={(e) => {
        e.preventDefault();
        navigate(-1);
      }}
      type="back"
    >
      &larr; Back
    </Button>
  );
}

export default ButtonBack;
