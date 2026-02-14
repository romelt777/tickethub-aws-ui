export default function DotsLoader() {
    return (
        <span className="inline-flex gap-1 text-lg">
            <span className="animate-bounce">•</span>
            <span className="animate-bounce [animation-delay:0.2s]">•</span>
            <span className="animate-bounce [animation-delay:0.4s]">•</span>
        </span>
    );
}