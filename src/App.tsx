import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { HiraganaTypingTest } from './screens/test';

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <HiraganaTypingTest />
        </>
    );
}

export default App;
