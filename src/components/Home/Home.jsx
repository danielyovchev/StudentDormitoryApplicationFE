import React from 'react';
import styles from "./Home.module.css";

export default function Home() {
    return (
        <div>
            <section className="welcome-section">
                <h2>About the System</h2>
                <p>
                    Our Dormitory Application System allows students to view available dormitory rooms, apply for accommodation, and manage their housing preferences. Begin your journey to finding the perfect room on campus today!
                </p>
            </section>

            <section className="features-section">
                <article>
                    <h3>Explore Dormitories</h3>
                    <p>
                        Discover all our dormitory options, complete with details on amenities, locations, and room types.
                    </p>
                </article>

                <article>
                    <h3>Simple Application Process</h3>
                    <p>
                        Our streamlined application process makes it easy to submit your preferences and required documents online.
                    </p>
                </article>

                <article>
                    <h3>24/7 Support</h3>
                    <p>
                        Our dedicated support team is here to help you with any questions or concerns at any time of the day.
                    </p>
                </article>
            </section>
        </div>
    );
};
