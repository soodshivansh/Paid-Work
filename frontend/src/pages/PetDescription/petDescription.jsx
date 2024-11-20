import React from "react";
import "./petDescription.css";
import PetInfo from '../../components/PetInfo/petInfo';
import petDetails from '../../data/petInfo';

const PetDescription = () => {
    const handleClick = () => {
        alert("Redirecting to adoption process!");
      };
    return (
        <div className="pet-description">
            <div className="header">
                <h1>Hi Human!</h1>
                <div className="petDetails">
                    <div>
                        <img
                            src="https://via.placeholder.com/50x50"
                            alt="Maggie"
                            className="main-image" />
                    </div>
                    <div>
                        <h2>Maggie</h2>
                        <p>Pet ID: 93638310</p>
                    </div>
                </div>
                <div className="location">
                    <p>United States of America</p>
                    <p>📍 California (32 km away)</p>
                </div>
            </div>
            <div className="main-section">
                <div className="image-section">
                    <img
                        src="https://via.placeholder.com/600x300"
                        alt="Maggie"
                        className="main-image"
                    />
                    <div className="thumbnail-section">
                        {[...Array(5)].map((_, i) => (
                            <img
                                key={i}
                                src="https://via.placeholder.com/100x100"
                                alt={`Thumbnail ${i}`}
                                className="thumbnail"
                            />
                        ))}
                    </div>
                </div>

                <div className="story">
                    <h3>Maggie Story</h3>
                    <p>
                        We have had Magie since she was able to leave her mum as a puppy so 8 weeks old. Magie currently lives with two children age 7 and 13 and has many visitors to the house which are children she is great with kids.There's lots of cats birds etc around the area and in the garden on most days as she's not fussed by these.
                    </p>
                    <ul>
                        <li>Vaccinated</li>
                        <li>House-trained</li>
                        <li>Neutered</li>
                        <li>Shots up-to-date</li>
                        <li>Microchipped</li>
                    </ul>
                </div>
            </div>
            <PetInfo petDetails={petDetails} />

            <div className="adopt-prompt">
                <p>If you are interested to adopt</p>
                <button className="get-started-button" onClick={handleClick}>
                    Get started
                </button>
            </div>

            <div className="similar-pets">
                <h1>Similar Pets</h1>
                <div className="pet-cards">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="card">
                            <img
                                src="https://via.placeholder.com/150"
                                alt={`Pet ${i}`}
                                className="card-image"
                            />
                            <h4>Pet Name</h4>
                            <p>Pet Breed</p>
                            <button className="moreInfoButton">More Info</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PetDescription;
