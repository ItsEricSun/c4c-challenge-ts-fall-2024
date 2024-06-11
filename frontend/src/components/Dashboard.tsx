import { useState, useEffect } from "react";
import PartnerTile from "./PartnerTile";
import NewPartnerForm from "./NewPartnerForm";
import { PartnerData } from "../types";

interface DashboardProps {}

/*
  The top-level component containing everything relevant to the dashboard,
  including information on each partner
*/
function Dashboard({}: DashboardProps) {
    const [partners, setPartners] = useState<PartnerData>({});

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

    const handleAddPartner = () => {
        fetchPartners();
    };

    // Load all partners on initial page load
    useEffect(() => {
        fetchPartners();
    }, []);

    return (
        <div id="main-content">
            <div id="main-partners-grid">
                <NewPartnerForm onAddPartner={handleAddPartner} />
                {Object.entries(partners).map(([key, partner]) => (
                    <PartnerTile partnerId={key} partnerDetails={partner} />
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
