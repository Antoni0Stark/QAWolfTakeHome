import React, { useState } from 'react';
import SearchResults from './SearchResults'

function Start() {

    const [depthValue, setDepthValue] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (event) => {
        setDepthValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission here, e.g., pass depthValue to a function for processing
        setSubmitted(true);
    };

    return (
        <div>
            <h1>Start Page</h1>
            <form onSubmit={handleSubmit}>
                <p>
                    Each increment is 30 more search results. The depth search will check if the Hacker News stories are in order from newest to oldest.
                </p>
                <label>
                    Depth Search Value:
                    <input
                        type="number"
                        value={depthValue}
                        onChange={handleChange}
                        min={0}
                    />
                </label>
                <button type="submit">Search</button>
            </form>
            {submitted && <SearchResults depthSearchValue={depthValue} />}
        </div>
    );
}

export default Start;