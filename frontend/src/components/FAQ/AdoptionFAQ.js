import React, { useState } from 'react';
import './FAQ.css';

const AdoptionFAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "What is the adoption process?",
            answer: "Our adoption process involves: 1) Browsing available pets 2) Submitting an application 3) Home visit and verification 4) Meeting the pet 5) Completing adoption paperwork 6) Taking your new friend home!"
        },
        {
            question: "What are the adoption fees?",
            answer: "Adoption fees range from 3000-30000 INR depending on the pet's age, breed, and medical needs. This covers vaccinations, spaying/neutering, microchipping, and initial medical care."
        },
        {
            question: "What documents do I need to adopt?",
            answer: "Required documents include: Valid ID proof, Address proof, Income proof (if applicable), Rental agreement with pet permission (if renting), and completed adoption application form."
        },
        {
            question: "Can I adopt if I live in a rented apartment?",
            answer: "Yes, you can adopt if you live in a rented apartment. You'll need to provide written permission from your landlord and ensure your living space is suitable for the pet you wish to adopt."
        },
        {
            question: "Do you provide post-adoption support?",
            answer: "Yes! We offer post-adoption support including: Behavioral advice, Medical consultation referrals, Training resources, and a support hotline for any questions or concerns."
        },
        {
            question: "What if the adoption doesn't work out?",
            answer: "We have a 2-week adjustment period. If the adoption doesn't work out during this time, you can return the pet and we'll help find them another home. We always prioritize the well-being of both pets and adopters."
        }
    ];

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="faq-container">
            <div className="faq-header">
                <h1>Adoption FAQs</h1>
                <p>Find answers to common questions about our adoption process</p>
            </div>
            <div className="faq-list">
                {faqs.map((faq, index) => (
                    <div 
                        key={index} 
                        className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                        onClick={() => toggleFAQ(index)}
                    >
                        <div className="faq-question">
                            <h3>{faq.question}</h3>
                            <span className="faq-icon">
                                {activeIndex === index ? '−' : '+'}
                            </span>
                        </div>
                        <div className={`faq-answer ${activeIndex === index ? 'show' : ''}`}>
                            <p>{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdoptionFAQ;
