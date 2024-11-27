import React, { useState } from 'react';
import './FAQ.css';

const RehomingFAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "How does the rehoming process work?",
            answer: "Our rehoming process includes: 1) Submitting pet details and photos 2) Our team reviews the information 3) We create an appealing profile 4) We screen potential adopters 5) We facilitate meet-and-greets 6) We help with the transfer process and paperwork."
        },
        {
            question: "Is there a fee for rehoming my pet?",
            answer: "No, our basic rehoming service is free. We believe in making the rehoming process accessible to ensure pets find the best possible homes. However, we do encourage a reasonable adoption fee to be set for the new family, which helps ensure committed adopters."
        },
        {
            question: "What information do I need to provide about my pet?",
            answer: "You'll need to provide: Basic information (age, breed, size), medical history (vaccinations, spay/neuter status), behavioral traits, daily routine, dietary needs, and reason for rehoming. Clear, recent photos are also essential."
        },
        {
            question: "How long does the rehoming process take?",
            answer: "The timeline varies depending on your pet's age, breed, and specific needs. While some pets find homes within days, others might take a few weeks. We focus on finding the right match rather than the quickest placement."
        },
        {
            question: "Can I stay in contact with the new family?",
            answer: "This depends on mutual agreement between you and the adopter. We can facilitate initial communication, but ongoing contact is decided between both parties. Many adopters are happy to send updates about their new pet."
        },
        {
            question: "What if my pet has special needs or medical conditions?",
            answer: "We welcome pets with special needs. We'll help highlight your pet's unique requirements and find families who are prepared and committed to providing appropriate care. Full transparency about medical conditions is essential."
        },
        {
            question: "How do you screen potential adopters?",
            answer: "We conduct thorough screening including: Reviewing adoption applications, checking references, verifying living situation, assessing experience with pets, and ensuring they understand the commitment. We prioritize finding responsible, loving homes."
        }
    ];

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="faq-container">
            <div className="faq-header">
                <h1>Rehoming FAQs</h1>
                <p>Essential information about rehoming your pet with care and confidence</p>
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

export default RehomingFAQ;
