class SpeechQueue {
    private queue: SpeechSynthesisUtterance[] = [];
    private isSpeaking: boolean = false;
    private lastSpokenText: string | null = null;
    private synth!: SpeechSynthesis; // Ensures TypeScript doesn't complain

    constructor() {
        if (typeof window !== "undefined") {
            this.synth = window.speechSynthesis;
            this.synth.onvoiceschanged = this.loadVoices.bind(this);
        }
    }

    private loadVoices() {
        this.synth.getVoices();
    }

    private speakNext() {
        if (this.isSpeaking || this.queue.length === 0) return;

        const utterance = this.queue.shift()!;
        
        // Avoid speaking the same text consecutively
        if (utterance.text === this.lastSpokenText) {
            this.speakNext(); // Skip and move to the next item in the queue
            return;
        }

        this.isSpeaking = true;
        this.lastSpokenText = utterance.text; // Update last spoken text

        utterance.onend = () => {
            this.isSpeaking = false;
            this.speakNext();
        };

        this.synth.speak(utterance);
    }

    public enqueue(text: string) {
        if (typeof window === "undefined") return;

        if (text === this.lastSpokenText) {
            console.warn(`Skipping duplicate text: ${text}`);
            return;
        }

        const utterance = this.createUtterance(text);
        this.queue.push(utterance);

        if (!this.isSpeaking) {
            this.speakNext();
        }
    }

    public speakImmediately(text: string) {
        if (typeof window === "undefined") return;

        if (text === this.lastSpokenText) {
            console.warn(`Skipping duplicate immediate speech: ${text}`);
            return;
        }

        const utterance = this.createUtterance(text);
        this.lastSpokenText = text; // Update last spoken text

        utterance.onend = () => {
            this.speakNext();
        };

        this.synth.speak(utterance);
    }

    private createUtterance(text: string): SpeechSynthesisUtterance {
        const utterance = new SpeechSynthesisUtterance(text);
        const voices = this.synth.getVoices();

        const maleVoice = voices.find(
            (voice) =>
                voice.name.includes("Male") ||
                voice.name.includes("David") ||
                voice.name.includes("Alex") ||
                voice.name.includes("Google UK English Male") ||
                voice.name.includes("com.apple.ttsbundle.siri_male_en-US_compact")
        );

        if (maleVoice) {
            utterance.voice = maleVoice;
        } else {
            console.warn("Male voice not found, using default voice.");
        }

        return utterance;
    }
}

const speechQueue = new SpeechQueue();

/**
 * Speaks numbers immediately, queues text, and avoids repeating the same text consecutively.
 * @param input - The text or number to be spoken.
 */
export const speakNumber = (input: number | string): void => {
    if (typeof input === "number" || /^[0-9]+$/.test(input)) {
        speechQueue.speakImmediately(input.toString()); // Speak numbers immediately
    } else {
        speechQueue.enqueue(input.toString()); // Queue text
    }
};

export default speakNumber;
