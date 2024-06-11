import { useState } from "react";

function NewPartnerForm() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error:", error);
                setErrorMessage(error.message);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
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
            <p>Active: </p>
            <input type="checkbox" id="active" name="active" value="true" />
            <br />
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <input type="submit" value="Submit" />
        </form>
    );
}

export default NewPartnerForm;
