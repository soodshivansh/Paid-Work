import React, { useState } from 'react';
import './CareGuide.css';

const CareGuide = () => {
    const [activeGuide, setActiveGuide] = useState('dog');

    const dogCareGuides = [
        {
            title: "Nutrition",
            content: [
                "Feed high-quality dog food appropriate for age and size",
                "Maintain regular feeding schedule",
                "Ensure fresh water is always available",
                "Monitor portion sizes to prevent obesity",
                "Avoid feeding human food and toxic items"
            ],
            image: "https://images.pexels.com/photos/1350591/pexels-photo-1350591.jpeg?auto=compress&cs=tinysrgb&w=500"
        },
        {
            title: "Exercise & Activity",
            content: [
                "Daily walks (at least 30 minutes to 2 hours based on breed)",
                "Regular playtime and mental stimulation",
                "Safe off-leash exercise in secure areas",
                "Age and breed-appropriate exercise levels",
                "Avoid exercise in extreme weather"
            ],
            image: "https://images.pexels.com/photos/4587998/pexels-photo-4587998.jpeg?auto=compress&cs=tinysrgb&w=500"
        },
        {
            title: "Health Care",
            content: [
                "Regular veterinary check-ups",
                "Keep vaccinations up to date",
                "Monthly flea and tick prevention",
                "Regular dental care and teeth brushing",
                "Monitor for changes in behavior or appetite"
            ],
            image: "https://images.pexels.com/photos/6235233/pexels-photo-6235233.jpeg?auto=compress&cs=tinysrgb&w=500"
        },
        {
            title: "Grooming",
            content: [
                "Regular brushing based on coat type",
                "Bathe as needed (usually every 4-8 weeks)",
                "Nail trimming every 2-4 weeks",
                "Clean ears regularly",
                "Professional grooming if needed"
            ],
            image: "https://images.pexels.com/photos/6816860/pexels-photo-6816860.jpeg?auto=compress&cs=tinysrgb&w=500"
        },
        {
            title: "Training & Socialization",
            content: [
                "Early puppy socialization",
                "Basic obedience training",
                "Positive reinforcement methods",
                "Consistent rules and boundaries",
                "Regular social interaction with other dogs"
            ],
            image: "https://images.pexels.com/photos/7210754/pexels-photo-7210754.jpeg?auto=compress&cs=tinysrgb&w=500"
        }
    ];

    const catCareGuides = [
        {
            title: "Nutrition",
            content: [
                "High-quality cat food (wet and/or dry)",
                "Fresh water available at all times",
                "Feed according to age and weight",
                "Monitor eating habits and weight",
                "Avoid human food and toxic substances"
            ],
            image: "https://images.pexels.com/photos/2173872/pexels-photo-2173872.jpeg?auto=compress&cs=tinysrgb&w=500"
        },
        {
            title: "Litter Box Care",
            content: [
                "Clean litter box daily",
                "Complete litter change weekly",
                "Multiple boxes for multiple cats",
                "Place boxes in quiet, accessible locations",
                "Use unscented, clumping litter"
            ],
            image: "https://images.pexels.com/photos/7725966/pexels-photo-7725966.jpeg?auto=compress&cs=tinysrgb&w=500"
        },
        {
            title: "Health Care",
            content: [
                "Annual veterinary check-ups",
                "Keep vaccinations current",
                "Regular flea and parasite prevention",
                "Dental care and teeth monitoring",
                "Watch for behavior changes"
            ],
            image: "https://images.pexels.com/photos/6235664/pexels-photo-6235664.jpeg?auto=compress&cs=tinysrgb&w=500"
        },
        {
            title: "Grooming",
            content: [
                "Regular brushing (daily for long-haired cats)",
                "Nail trimming every few weeks",
                "Check and clean ears monthly",
                "Brush teeth or use dental treats",
                "Professional grooming if needed"
            ],
            image: "https://images.pexels.com/photos/1543793/pexels-photo-1543793.jpeg?auto=compress&cs=tinysrgb&w=500"
        },
        {
            title: "Environmental Enrichment",
            content: [
                "Provide scratching posts",
                "Multiple perching areas",
                "Interactive toys and playtime",
                "Cozy sleeping spots",
                "Window views for entertainment"
            ],
            image: "https://images.pexels.com/photos/2558605/pexels-photo-2558605.jpeg?auto=compress&cs=tinysrgb&w=500"
        }
    ];

    return (
        <div className="care-guide-container">
            <div className="care-guide-header">
                <h1>Pet Care Guide</h1>
                <p>Essential care information for your furry friends</p>
                <div className="guide-toggle">
                    <button 
                        className={`toggle-btn ${activeGuide === 'dog' ? 'active' : ''}`}
                        onClick={() => setActiveGuide('dog')}
                    >
                        Dog Care Guide
                    </button>
                    <button 
                        className={`toggle-btn ${activeGuide === 'cat' ? 'active' : ''}`}
                        onClick={() => setActiveGuide('cat')}
                    >
                        Cat Care Guide
                    </button>
                </div>
            </div>
            
            <div className="guide-content">
                <div className="pet-care-guide">
                    <h2>{activeGuide === 'dog' ? 'Dog Care Guide' : 'Cat Care Guide'}</h2>
                    <div className="care-sections">
                        {(activeGuide === 'dog' ? dogCareGuides : catCareGuides).map((guide, index) => (
                            <div key={index} className="care-section">
                                <div className="care-section-image">
                                    <img src={guide.image} alt={guide.title} />
                                </div>
                                <h3>{guide.title}</h3>
                                <ul>
                                    {guide.content.map((item, itemIndex) => (
                                        <li key={itemIndex}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CareGuide;
