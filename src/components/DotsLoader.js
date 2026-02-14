export default function DotsLoader() {
    return (
        <span className="flex gap-1 text-4xl">
            <span className="animate-bounce">•</span>
            <span className="animate-bounce [animation-delay:0.2s]">•</span>
            <span className="animate-bounce [animation-delay:0.4s]">•</span>
        </span>
    );
}