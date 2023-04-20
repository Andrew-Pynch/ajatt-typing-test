import React, { useEffect, useState } from 'react';
import { hiraganaToRomajiMap } from '../domain/hiragana-to-romanji';

export const HiraganaTypingTest: React.FC = () => {
    const sampleSentence = 'ひとつ ふたつ みっつ'; // You can replace this with your desired sentence

    const [input, setInput] = useState('');
    const [hiraganaChars, setHiraganaChars] = useState(
        sampleSentence.split('')
    );
    const [status, setStatus] = useState<string[]>(
        Array(hiraganaChars.length).fill('untyped')
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newInput = e.target.value;
        setInput(newInput);

        const newStatus = Array(hiraganaChars.length).fill('untyped');
        let currentIndex = 0;
        let romajiIndex = 0;
        let inputIndex = 0;

        while (
            inputIndex < newInput.length &&
            currentIndex < hiraganaChars.length
        ) {
            const currentChar = hiraganaChars[currentIndex];

            if (currentChar === ' ') {
                currentIndex++;
                continue;
            }

            if (newInput[inputIndex] === ' ') {
                inputIndex++;
                continue;
            }

            const expectedRomaji = hiraganaToRomajiMap.get(currentChar) ?? '';

            if (
                currentChar === 'っ' &&
                newInput[inputIndex] === expectedRomaji.charAt(romajiIndex)
            ) {
                romajiIndex++;
                if (romajiIndex === expectedRomaji.length) {
                    newStatus[currentIndex] = 'correct';
                    currentIndex++;
                    romajiIndex = 0;
                }
            } else if (
                newInput[inputIndex] === expectedRomaji.charAt(romajiIndex)
            ) {
                romajiIndex++;
                if (romajiIndex === expectedRomaji.length) {
                    newStatus[currentIndex] = 'correct';
                    currentIndex++;
                    romajiIndex = 0;
                }
            } else {
                newStatus[currentIndex] = 'incorrect';
                break;
            }

            inputIndex++;
        }

        setStatus(newStatus);
    };

    useEffect(() => {
        setStatus(Array(hiraganaChars.length).fill('untyped'));
    }, [hiraganaChars]);

    // getColor function for use in styling the hiragana characters
    const getColor = (status: string) => {
        switch (status) {
            case 'correct':
                return 'green';
            case 'incorrect':
                return 'red';
            default:
                return 'grey';
        }
    };

    return (
        <div>
            <div>
                {hiraganaChars.map((char, index) => (
                    <span
                        key={index}
                        style={{ color: getColor(status[index]) }}
                    >
                        {char}
                    </span>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={handleChange}
                placeholder="Type the romanized version here"
                autoFocus
            />
        </div>
    );
};

export default HiraganaTypingTest;
