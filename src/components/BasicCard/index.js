import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import "./styles.css";

export default function BasicCard({ card }) {
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
        <cite>
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
        />
        <DeleteOutlineIcon
          sx={{
            cursor: "pointer",
            border: "1px solid black",
            borderRadius: "5px",
          }}
        />
      </div>
    </div>
  );
}
