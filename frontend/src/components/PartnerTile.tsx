import { PartnerDetails } from "../types";

/*
  A block for a single partner, containing information for them
  along with any tools to manage said information
*/

interface PartnerTileProps {
    partnerId: string;
    partnerDetails: PartnerDetails;
}

function PartnerTile({ partnerId, partnerDetails }: PartnerTileProps) {
    const { thumbnailUrl, name, description, active } = partnerDetails;

    const handleClick = () => {
        console.log({ partnerId });
        fetch(`http://localhost:4000/${partnerId}`, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error deleting partner:", error);
            });
    };

    return (
        <div className="partner-tile">
            <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                    className="partner-thumbnail"
                    src={thumbnailUrl}
                    alt={name}
                />
            </div>
            <hr />
            <div className="partner-info">
                <h3>{name}</h3>
                <p>{active ? "Active" : "Inactive"}</p>
                <p>{description}</p>
            </div>
            <button onClick={handleClick} className="delete-button">
                Delete
            </button>
        </div>
    );
}

export default PartnerTile;
