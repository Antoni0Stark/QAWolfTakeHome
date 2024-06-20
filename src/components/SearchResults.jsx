import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';

function SearchResults({ depthSearchValue }) {
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        async function scrapeHackerNews() {
            const results = [];

            // Iterate through each depth to scrape
            for (let i = 1; i <= depthSearchValue; i++) {
                const url = `https://news.ycombinator.com/newest?${i}`;

                try {
                    const response = await axios.get(url);
                    const html = response.data;
                    const $ = cheerio.load(html);

                    // Extract information from the page
                    const stories = [];
                    $('tr.athing').each((index, element) => {
                        const story = {};
                        const title = $(element).find('.title a').text();
                        const author = $(element).next().find('.hnuser').text();
                        const link = $(element).find('.title a').attr('href');

                        story.title = title;
                        story.author = author;
                        story.link = link;
                        stories.push(story);
                    });

                    results.push(...stories);
                } catch (error) {
                    console.error(`Error scraping page ${url}: ${error}`);
                }
            }

            setSearchResults(results);
        }

        scrapeHackerNews();
    }, [depthSearchValue]);

    // Function to determine if a story is newer than the next one
    const isNewerThanNext = (index) => {
        if (index === searchResults.length - 1) {
            return false; // Last story, no next story to compare
        }
        const currentStoryTime = new Date(searchResults[index].time).getTime();
        const nextStoryTime = new Date(searchResults[index + 1].time).getTime();
        return currentStoryTime > nextStoryTime;
    };

    return (
        <div>
            <h1>Search Results</h1>
            <table>
                <thead>
                    <tr>
                        <th>Author</th>
                        <th>Link</th>
                        <th>Time</th>
                        <th>Newer Than Next?</th>
                    </tr>
                </thead>
                <tbody>
                    {searchResults.map((result, index) => (
                        <tr key={index}>
                            <td>{result.author}</td>
                            <td><a href={result.link} target="_blank" rel="noopener noreferrer">Story Link</a></td>
                            {/* Assuming result.time exists in your data */}
                            <td>{result.time}</td>
                            <td>{isNewerThanNext(index) ? 'Yes' : 'No'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SearchResults;