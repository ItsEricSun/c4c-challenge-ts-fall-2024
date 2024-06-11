import { PartnerDetails } from "../types";
import { useState } from "react";

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
    const [showConfirmation, setShowConfirmation] = useState(false);

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
            {!showConfirmation && (
                <button onClick={() => setShowConfirmation(true)} className="delete-button">
                    Delete
                </button>
            )}
            {showConfirmation && (
                <div className="confirmation">
                    <p style={{ marginBottom: "0" }}>Are you sure you want to delete this partner?</p>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <button onClick={() => setShowConfirmation(false)} className="cancel-button" style={{ width: "50%"}}>Cancel</button>
                        <button onClick={handleClick} className="delete-button" style={{ width: "50%" }}>Delete</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PartnerTile;
