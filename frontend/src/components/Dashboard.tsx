import { useState, useEffect } from "react";
import PartnerTile from "./PartnerTile";
import NewPartnerForm from "./NewPartnerForm";
import { PartnerData } from "../types";


/*
  The top-level component containing everything relevant to the dashboard,
  including information on each partner
*/
function Dashboard() {
    const [partners, setPartners] = useState<PartnerData>({});

    // Fetch all partners from the server
    const fetchPartners = () => {
        fetch("http://localhost:4000", {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data: PartnerData) => {
                setPartners(data);
            })
            .catch((error) => {
                console.error("Error getting partners:", error);
            });
    };

    // Update the list of partners when a new one is added or an existing one is deleted
    const handleUpdatePartner = () => {
        fetchPartners();
    };

    // Load all partners on initial page load
    useEffect(() => {
        fetchPartners();
    }, []);

    return (
        <div id="main-content">
            <div id="main-partners-grid">
                <NewPartnerForm onAddPartner={handleUpdatePartner} />
                {Object.entries(partners).map(([key, partner]) => (
                    <PartnerTile partnerId={key} partnerDetails={partner} onDeletePartner={handleUpdatePartner}/>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
