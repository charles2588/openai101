// components/LawyerChat.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../components/LawyerChat.module.css';

const LawyerChat = () => {
    const [chatHistory, setChatHistory] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [transferRequested, setTransferRequested] = useState(false);
    const [transcriptSent, setTranscriptSent] = useState(false);
    const [chatEnded, setChatEnded] = useState(false);
    const [rating, setRating] = useState('');

    useEffect(() => {
        if (transferRequested) {
            // Initialize Intercom
            window.Intercom('boot', {
                app_id: 'YOUR_INTERCOM_APP_ID',
            });
        }

        // Clean up Intercom when component unmounts or transferRequested becomes false
        return () => {
            if (transferRequested) {
                window.Intercom('shutdown');
            }
        };
    }, [transferRequested]);

    const addMessageToChat = (sender, content) => {
        setChatHistory([...chatHistory, { sender, content }]);
    };

    const sendMessage = async () => {
        if (userInput.trim() === '') return;

        addMessageToChat('user', userInput);
        setUserInput('');
        try {
            const response = await axios.post('/api/lawyer', { prompt: userInput });
            const lawyerResponse = response.data.result;
            addMessageToChat('user', userInput);
            addMessageToChat('lawyer',"hello");
            console.log(lawyerResponse);
            lawyerResponse.forEach((message)=>addMessageToChat('lawyer',message.text));
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const clearChat = () => {
        setChatHistory([]);
    };

    const requestTransfer = () => {
        setTransferRequested(true);
        addMessageToChat('user', '[Requesting transfer to agent]');
    };

    const sendTranscript = () => {
        setTranscriptSent(true);
        addMessageToChat('user', '[Sending chat transcript to email]');
    };

    const endChat = () => {
        setChatEnded(true);
        addMessageToChat('user', '[Chat ended]');
    };

    const handleRating = (selectedRating) => {
        setRating(selectedRating);
        addMessageToChat('user', `[Rated: ${selectedRating}]`);
    };

    return (
        <div>
            <div className={styles.chatHistory}>
                {chatHistory.map((message, index) => (
                    <div
                        key={index}
                        className={`${styles.message} ${styles[message.sender]}`}
                    >
                        {message.content}
                    </div>
                ))}
            </div>
            {!chatEnded && (
                <div>
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                    />
                    <button onClick={sendMessage}>Send</button>
                    <button onClick={clearChat}>Clear Chat</button>
                    {!transferRequested && (
                        <button onClick={requestTransfer}>Request Transfer</button>
                    )}
                    {!transcriptSent && (
                        <button onClick={sendTranscript}>Send Transcript</button>
                    )}
                    <div>
                        <button onClick={() => handleRating('like')}>Like</button>
                        <button onClick={() => handleRating('dislike')}>Dislike</button>
                    </div>
                    <button onClick={endChat}>End Chat</button>
                </div>
            )}
            {chatEnded && (
                <div>
                    <h3>Chat Ended</h3>
                    <div>
                        <h4>Rate Your Chat Experience:</h4>
                        <div>
                            <button onClick={() => handleRating('like')}>Like</button>
                            <button onClick={() => handleRating('dislike')}>Dislike</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LawyerChat;