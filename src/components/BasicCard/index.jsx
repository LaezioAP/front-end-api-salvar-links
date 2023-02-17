import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/auth";
import api from "../../services/api";
import { getItem } from "../../utils/storage";
import { UpdateRegister } from "../formUpdate";
import "./styles.css";

export default function BasicCard({ card }) {
  const hooks = useContext(AuthContext);
  const { getLinks } = hooks.links;
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const deleteRegister = async (idCard) => {
    await api.delete(`/dashboard/${idCard}`, {
      headers: {
        authorization: `Bearer ${getItem("token")}`,
      },
    });
    getLinks();
  };

  return (
    <div className="container-card flex-column">
      <div className="content-infos flex-column">
        <h2>
          <a
            className="content-link-h2"
            target="_blank"
            href={`${card.url}`}
            rel="noreferrer noopener"
          >
            {card.title}
          </a>
        </h2>
        <cite className="text-overflow">
          <a
            className="content-link-cite"
            target="_blank"
            href={`${card.url}`}
            rel="noreferrer noopener"
          >
            {card.url}
          </a>
        </cite>
      </div>

      <div className="content-actions">
        <EditIcon
          sx={{
            cursor: "pointer",
            border: "1px solid black",
            borderRadius: "5px",
          }}
          onClick={handleOpen}
        />
        <DeleteOutlineIcon
          sx={{
            cursor: "pointer",
            border: "1px solid black",
            borderRadius: "5px",
          }}
          onClick={() => deleteRegister(card.id)}
        />
      </div>

      <Modal
        open={openModal}
        onClose={handleClose}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box>
          <UpdateRegister handleClose={handleClose} idCard={card.id} />
        </Box>
      </Modal>
    </div>
  );
}
