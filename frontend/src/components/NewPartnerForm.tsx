import { useState } from "react";

type NewPartnerFormProps = {
    onAddPartner: () => void;
};

function NewPartnerForm({ onAddPartner }: NewPartnerFormProps) {
    // A message that is shown after the form is submitted
    const [message, setMessage] = useState<string | null>(null);
    const [messageColor, setMessageColor] = useState<string>("green");

    // Handle form submission
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.target as HTMLFormElement;
        event.preventDefault();

        const formData = new FormData(form);
        const data = {
            name: formData.get("name"),
            id: formData.get("id"),
            description: formData.get("description"),
            thumbnailUrl: formData.get("thumbnailUrl"),
            active: formData.get("active") ? true : false,
        };

        fetch("http://localhost:4000/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((errorData) => {
                        throw new Error(
                            errorData.error || "Something went wrong"
                        );
                    });
                }
                return response.json();
            })
            .then((data) => {
                console.log("Success:", data);
                setMessage("Partner added successfully");
                setMessageColor("green");
                (document.getElementById("newPartnerForm") as HTMLFormElement)?.reset();
                onAddPartner();
            })
            .catch((error) => {
                console.error("Error:", error);
                setMessage(error.message);
                setMessageColor("red");
            });
    };

    return (
        <div className="form-container">
            <form id="newPartnerForm" onSubmit={handleSubmit}>
                <h2>Add a New Partner</h2>
                <p>Partner Name:</p>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Partner name"
                    required
                />
                <p>Partner ID:</p>
                <input
                    type="text"
                    id="id"
                    name="id"
                    placeholder="Partner ID"
                    required
                />
                <p>Partner Description:</p>
                <textarea
                    id="description"
                    name="description"
                    placeholder="Partner description"
                    style={{ maxWidth: "100%" }}
                    required
                ></textarea>
                <p>Partner Thumbnail URL:</p>
                <input
                    type="text"
                    id="thumbnailUrl"
                    name="thumbnailUrl"
                    placeholder="Thumbnail URL"
                    required
                />
                <p>
                    Active:
                    <input
                        type="checkbox"
                        id="active"
                        name="active"
                        value="true"
                    />
                </p>
                {message ? (
                    <p style={{ color: messageColor }}>{message}</p>
                ) : (
                    <p>&nbsp;</p>
                )}
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default NewPartnerForm;
