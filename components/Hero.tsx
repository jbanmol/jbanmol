import React from 'react';
import { ArrowDown } from 'lucide-react';

const Typewriter: React.FC<{ words: string[] }> = ({ words }) => {
  const [wordIndex, setWordIndex] = React.useState(0);
  const [text, setText] = React.useState('');
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    const type = () => {
      const currentWord = words[wordIndex];
      const updatedText = isDeleting
        ? currentWord.substring(0, text.length - 1)
        : currentWord.substring(0, text.length + 1);

      setText(updatedText);

      if (!isDeleting && updatedText === currentWord) {
        // Pause longer after typing a line
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    };

    const typingSpeed = isDeleting ? 50 : 80;
    const timer = setTimeout(type, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, words]);

  const textStyle = "font-code font-medium text-xl md:text-2xl text-[var(--muted)]";
  const cursorStyle = "text-xl md:text-2xl";

  return (
    <span className={`tracking-tight transition-all duration-300 ${textStyle}`}>
      {text}
      <span className={`cursor-blink ${cursorStyle}`} style={{ color: 'var(--accent-primary)'}}>|</span>
    </span>
  );
};


const Hero: React.FC = () => {
  return (
    <div className="text-center flex flex-col items-center">
        <div className="mb-4">
            <div 
              className="p-1 rounded-full bg-gradient-accent" 
              style={{ boxShadow: '0 0 20px var(--shadow-color)'}}
              onMouseEnter={() => document.body.classList.add('cursor-hidden-by-hover')}
              onMouseLeave={() => document.body.classList.remove('cursor-hidden-by-hover')}
            >
        <img
          src="/assets/IMG_3429.JPG"
          alt="Jb Anmol"
          className="w-52 h-52 rounded-full object-cover border-4"
          style={{ borderColor: 'var(--surface)'}}
        />
            </div>
        </div>
        <div className="mb-6 text-center">
            <p className="text-xl font-medium text-[var(--text)] tracking-wide">
                Data Scientist <span className="text-[var(--muted)] mx-1">|</span> AI Enthusiast
            </p>
        </div>
        <div className="flex items-center justify-center mb-6">
            <Typewriter words={[
                "Hi, I’m Anmol() 👋",
                "Python 🐍 and caffeine ☕",
                "debugs life with yoga 🐛🔧",
                "build things that don’t break (much) 🏗️😅",
            ]} />
        </div>
        <a 
            href="#projects" 
            className="group inline-flex items-center justify-center gap-2.5 px-8 py-2.5 font-semibold text-base rounded-full bg-transparent border text-[var(--accent-primary)] border-[var(--accent-primary)] transition-all duration-300 ease-in-out hover:bg-gradient-accent hover:text-[var(--text-on-accent)] hover:border-transparent hover:shadow-[0_0_25px_-5px_var(--glow-color)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-[var(--bg)]"
        >
            View My Work
            <ArrowDown className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-0.5" />
        </a>
    </div>
  );
};

export default Hero;