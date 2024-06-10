import { PartnerDetails } from "../types";

/*
  A block for a single partner, containing information for them
  along with any tools to manage said information
*/

interface PartnerTileProps {
  partnerDetails: PartnerDetails
}

function PartnerTile({ partnerDetails }: PartnerTileProps) {
  const { thumbnailUrl, name, description, active } = partnerDetails;

  return (
    <div className="partner-tile">
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img className="partner-thumbnail" src={thumbnailUrl} alt={name}/>
      </div>
      <hr />
      <div className="partner-info">
        <h3>{name}</h3>
        <p>{active ? "Active" : "Inactive"}</p>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default PartnerTile;