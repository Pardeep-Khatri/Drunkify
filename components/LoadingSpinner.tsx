import React, { useState, useEffect } from 'react';

const quotes = [
  "Beer is proof that God loves us and wants us to be happy.",
  "He was a wise man who invented beer.",
  "Life is too short to drink cheap beer.",
  "In a study, scientists report that drinking beer can be good for your liver. I'm sorry, did I say 'scientists'? I meant 'Irish people'.",
  "Beauty is in the eye of the beer holder.",
  "To beer, or not to beer, that is a silly question.",
  "I'm on a beer diet. I've lost three days already.",
  "Beer makes me hoppy.",
  "A fine beer may be judged with only one sip, but it's better to be thoroughly sure."
];

export const LoadingSpinner: React.FC = () => {
  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setQuote(prevQuote => {
        let newQuote;
        do {
          newQuote = quotes[Math.floor(Math.random() * quotes.length)];
        } while (newQuote === prevQuote);
        return newQuote;
      });
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-blue-400"></div>
      <p className="text-blue-300 text-center max-w-sm italic">"{quote}"</p>
    </div>
  );
};